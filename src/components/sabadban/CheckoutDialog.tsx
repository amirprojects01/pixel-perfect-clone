import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { stores, toFa } from "@/data/catalog";
import type { StoreQuote } from "@/lib/compare";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  quote: StoreQuote | null;
  onOpenChange: (open: boolean) => void;
};

export function CheckoutDialog({ quote, onOpenChange }: Props) {
  const [phase, setPhase] = useState<"review" | "sending" | "done">("review");

  useEffect(() => {
    if (quote) setPhase("review");
  }, [quote]);

  useEffect(() => {
    if (phase !== "sending") return;
    const t = setTimeout(() => setPhase("done"), 1600);
    return () => clearTimeout(t);
  }, [phase]);

  const store = quote ? stores.find((s) => s.id === quote.storeId) : null;

  return (
    <Dialog open={Boolean(quote)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl text-right" dir="rtl">
        <DialogHeader className="text-right sm:text-right">
          <DialogTitle>انتقال سبد به {store?.name}</DialogTitle>
          <DialogDescription>
            این اقلام دقیقاً به سبد خرید فروشگاه منتقل می‌شوند.
          </DialogDescription>
        </DialogHeader>

        {phase === "done" ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto size-12 text-primary" />
            <p className="mt-4 font-bold">سبد شما منتقل شد</p>
            <p className="mt-1 text-sm text-muted-foreground">
              در حال انتقال به درگاه پرداخت {store?.name}… (نمونه‌سازی)
            </p>
          </div>
        ) : (
          <>
            <ul className="max-h-64 space-y-2 overflow-auto pl-1">
              {quote?.available.map((row) => (
                <li
                  key={row.product.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-secondary px-3 py-2 text-sm"
                >
                  <span className="min-w-0 truncate">
                    {row.product.name}
                    <span className="mr-1 text-xs text-muted-foreground">×{toFa(row.qty)}</span>
                  </span>
                  <span className="shrink-0 tabular-nums">{toFa(row.price * row.qty)}</span>
                </li>
              ))}
            </ul>

            {quote && quote.missing.length > 0 && (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {quote.missing.map((m) => m.name).join("، ")} در این فروشگاه ناموجود است و منتقل
                نمی‌شود.
              </p>
            )}

            <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">مبلغ قابل پرداخت</span>
              <span className="text-xl font-black">{toFa(quote?.total ?? 0)} تومان</span>
            </div>

            <Button
              className="h-11 w-full rounded-xl"
              disabled={phase === "sending"}
              onClick={() => setPhase("sending")}
            >
              {phase === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  در حال انتقال…
                </>
              ) : (
                <>
                  تأیید و ادامه در {store?.name}
                  <ExternalLink className="size-4" />
                </>
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
