import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Timer, TrendingDown } from "lucide-react";
import { toast } from "sonner";

import { SearchAdd } from "@/components/sabadban/SearchAdd";
import { BasketPanel } from "@/components/sabadban/BasketPanel";
import { StoreComparison } from "@/components/sabadban/StoreComparison";
import { CheckoutDialog } from "@/components/sabadban/CheckoutDialog";
import { Watchlist } from "@/components/sabadban/Watchlist";
import { getProduct, quoteBasket, rankQuotes, type BasketItem, type StoreQuote } from "@/lib/compare";
import { toFa } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "سبدبان | ارزان‌ترین فروشگاه برای سبد خرید شما" },
      {
        name: "description",
        content:
          "سبد خرید روزانه‌ات را یک‌بار بساز و قیمت کل آن را در اسنپ‌اکسپرس، دیجی‌کالا جت و اُکالا مقایسه کن.",
      },
      { property: "og:title", content: "سبدبان | مقایسه قیمت سبد خرید سوپرمارکتی" },
      {
        property: "og:description",
        content: "یک سبد، سه فروشگاه، یک انتخاب ارزان. با احتساب تخفیف و هزینه ارسال.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [basket, setBasket] = useState<BasketItem[]>([
    { id: "milk-kale", qty: 2 },
    { id: "egg", qty: 1 },
    { id: "rice-hashemi", qty: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState<StoreQuote | null>(null);

  useEffect(() => {
    if (basket.length === 0) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [basket]);

  const quotes = useMemo(() => quoteBasket(basket), [basket]);
  const { best, saving } = useMemo(() => rankQuotes(quotes), [quotes]);

  const add = (id: string) => {
    setBasket((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
    toast.success(`${getProduct(id)?.name ?? "کالا"} به سبد اضافه شد`);
  };

  const inc = (id: string) =>
    setBasket((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id: string) =>
    setBasket((prev) =>
      prev.flatMap((i) =>
        i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i],
      ),
    );
  const remove = (id: string) => setBasket((prev) => prev.filter((i) => i.id !== id));

  const itemCount = basket.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <TrendingDown className="size-5" />
            </span>
            <span className="text-lg font-black tracking-tight">سبدبان</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hidden sm:inline">مقایسه قیمت سبد خرید</span>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
              {toFa(itemCount)} قلم در سبد
            </span>
          </nav>
        </div>
      </header>

      <section className="surface-grid border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            قیمت‌ها با احتساب تخفیف و هزینه ارسال
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
            یک سبد بساز، ارزان‌ترین فروشگاه را{" "}
            <span className="text-primary">در چند ثانیه</span> پیدا کن.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            به‌جای چک‌کردن جداگانه اسنپ‌اکسپرس، دیجی‌کالا جت و اُکالا، همین‌جا سبدت را بچین و مبلغ
            نهایی هر سه فروشگاه را کنار هم ببین.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchAdd onAdd={add} inBasket={(id) => basket.some((i) => i.id === id)} />
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Timer className="size-4 text-accent" />
              به‌روزرسانی قیمت‌ها هر ۱۵ دقیقه
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingDown className="size-4 text-primary" />
              میانگین صرفه‌جویی کاربران: ۱۸٪
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <BasketPanel
            basket={basket}
            onInc={inc}
            onDec={dec}
            onRemove={remove}
            onClear={() => setBasket([])}
          />
          <Watchlist />
        </aside>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black">مقایسه زنده فروشگاه‌ها</h2>
              <p className="text-sm text-muted-foreground">
                دقیقاً همین سبد در سه فروشگاه محاسبه شده است.
              </p>
            </div>
          </div>

          <StoreComparison
            quotes={quotes}
            bestId={best?.storeId}
            saving={saving}
            loading={loading}
            empty={basket.length === 0}
            onCheckout={setCheckout}
          />
        </section>
      </main>

      <footer className="border-t border-border/70 py-8 text-center text-xs text-muted-foreground">
        سبدبان — نمونه‌ی نمایشی مقایسه قیمت سوپرمارکتی. قیمت‌ها آزمایشی است.
      </footer>

      <CheckoutDialog quote={checkout} onOpenChange={(o) => !o && setCheckout(null)} />
    </div>
  );
}
