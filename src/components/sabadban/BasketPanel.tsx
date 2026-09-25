import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { toFa, unitPrice } from "@/data/catalog";
import { getProduct, type BasketItem } from "@/lib/compare";
import { Button } from "@/components/ui/button";

type Props = {
  basket: BasketItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export function BasketPanel({ basket, onInc, onDec, onRemove, onClear }: Props) {
  const count = basket.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative grid size-10 place-items-center rounded-2xl bg-primary-soft text-primary">
            <ShoppingBasket className="size-5" />
            {count > 0 && (
              <span className="absolute -left-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-accent-foreground">
                {toFa(count)}
              </span>
            )}
          </span>
          <div>
            <h2 className="font-bold">سبد هوشمند من</h2>
            <p className="text-xs text-muted-foreground">{toFa(count)} قلم کالا</p>
          </div>
        </div>
        {basket.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground">
            خالی کردن
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {basket.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border px-4 py-10 text-center">
            <ShoppingBasket className="mx-auto size-8 text-muted-foreground/60" />
            <p className="mt-3 text-sm font-medium">سبد شما خالی است</p>
            <p className="mt-1 text-xs text-muted-foreground">
              با جست‌وجو یا چیپس‌های بالا کالا اضافه کنید تا مقایسه شروع شود.
            </p>
          </div>
        )}

        {basket.map((item) => {
          const p = getProduct(item.id);
          if (!p) return null;
          const ref = unitPrice(p, "digijet") ?? unitPrice(p, "snapp") ?? 0;
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-3 animate-in fade-in-0 slide-in-from-top-1"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.unit} • حدود {toFa(ref * item.qty)} تومان
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
                <button
                  type="button"
                  onClick={() => onInc(item.id)}
                  className="grid size-7 place-items-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                  aria-label="افزایش"
                >
                  <Plus className="size-4" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{toFa(item.qty)}</span>
                <button
                  type="button"
                  onClick={() => onDec(item.id)}
                  className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                  aria-label="کاهش"
                >
                  <Minus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="حذف"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
