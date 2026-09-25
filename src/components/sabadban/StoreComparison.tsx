import { ArrowLeft, BadgeCheck, Bike, PackageX, Sparkles, Store as StoreIcon } from "lucide-react";
import { stores, toFa } from "@/data/catalog";
import type { StoreQuote } from "@/lib/compare";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  quotes: StoreQuote[];
  bestId: string | undefined;
  saving: number;
  loading: boolean;
  empty: boolean;
  onCheckout: (quote: StoreQuote) => void;
};

const toneRing: Record<string, string> = {
  snapp: "bg-brand-snapp/10 text-brand-snapp",
  digijet: "bg-brand-digijet/10 text-brand-digijet",
  okala: "bg-brand-okala/10 text-brand-okala",
};

export function StoreComparison({ quotes, bestId, saving, loading, empty, onCheckout }: Props) {
  if (empty) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center">
        <StoreIcon className="mx-auto size-10 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-bold">هنوز چیزی برای مقایسه نیست</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          چند کالا به سبد اضافه کن تا قیمت کل سبد را هم‌زمان در اسنپ‌اکسپرس، دیجی‌کالا جت و اُکالا
          ببینی.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {stores.map((s) => (
          <div key={s.id} className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-2xl" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="mt-6 h-8 w-40" />
            <Skeleton className="mt-3 h-4 w-24" />
            <Skeleton className="mt-6 h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {quotes.map((q) => {
        const store = stores.find((s) => s.id === q.storeId)!;
        const isBest = q.storeId === bestId;
        return (
          <div
            key={q.storeId}
            className={`relative flex flex-col rounded-3xl border bg-card p-5 transition-all duration-300 ${
              isBest
                ? "border-primary shadow-glow md:-translate-y-1"
                : "border-border shadow-soft hover:-translate-y-0.5 hover:shadow-lift"
            }`}
          >
            {isBest && (
              <span className="absolute -top-3 right-5 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-soft">
                <BadgeCheck className="size-3.5" />
                ارزان‌ترین گزینه
              </span>
            )}

            <div className="flex items-center gap-3">
              <span
                className={`grid size-11 place-items-center rounded-2xl text-sm font-black ${toneRing[q.storeId]}`}
              >
                {store.short}
              </span>
              <div>
                <p className="font-bold">{store.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Bike className="size-3.5" />
                  ارسال {toFa(q.deliveryFee)} تومان
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>جمع کالاها</span>
                <span>{toFa(q.productsTotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>هزینه ارسال</span>
                <span>{toFa(q.deliveryFee)}</span>
              </div>
              <div className="flex items-end justify-between border-t border-border pt-2">
                <span className="font-medium">مبلغ نهایی</span>
                <span className="text-2xl font-black tabular-nums">
                  {toFa(q.total)}
                  <span className="mr-1 text-xs font-medium text-muted-foreground">تومان</span>
                </span>
              </div>
            </div>

            {isBest && saving > 0 && (
              <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-primary-soft px-3 py-2 text-xs font-bold text-primary">
                <Sparkles className="size-4" />
                شما {toFa(saving)} تومان سود می‌کنید
              </p>
            )}

            <div className="mt-4 space-y-1 text-xs">
              <p className="text-muted-foreground">
                {toFa(q.available.length)} کالا موجود
                {q.missing.length > 0 && ` • ${toFa(q.missing.length)} کالا ناموجود`}
              </p>
              {q.missing.map((m) => (
                <p key={m.id} className="flex items-center gap-1 text-destructive">
                  <PackageX className="size-3.5" />
                  {m.name}
                </p>
              ))}
            </div>

            <Button
              onClick={() => onCheckout(q)}
              variant={isBest ? "default" : "secondary"}
              className="mt-auto h-auto w-full whitespace-normal rounded-xl px-4 py-3 pt-3 text-sm leading-6"
            >
              <span>انتقال سبد خرید و پرداخت در {store.name}</span>
              <ArrowLeft className="size-4 shrink-0" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
