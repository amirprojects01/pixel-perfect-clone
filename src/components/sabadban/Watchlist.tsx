import { useState } from "react";
import { BellRing, BellPlus, X } from "lucide-react";
import { toast } from "sonner";
import { products, toFa } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type Alert = { id: string; productId: string; threshold: number };

export function Watchlist() {
  const [productId, setProductId] = useState("mince-meat");
  const [threshold, setThreshold] = useState(20);
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "seed-1", productId: "rice-hashemi", threshold: 15 },
  ]);

  const add = () => {
    const exists = alerts.some((a) => a.productId === productId);
    if (exists) {
      toast.error("برای این کالا قبلاً هشدار ثبت کرده‌اید.");
      return;
    }
    setAlerts((a) => [...a, { id: crypto.randomUUID(), productId, threshold }]);
    toast.success("هشدار تخفیف ثبت شد.");
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="grid size-10 place-items-center rounded-2xl bg-accent-soft text-accent">
          <BellRing className="size-5" />
        </span>
        <div>
          <h2 className="font-bold">هشدار تخفیف</h2>
          <p className="text-xs text-muted-foreground">
            وقتی کالای موردنظرت ارزان شد، خبرت می‌کنیم.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Select value={productId} onValueChange={setProductId}>
          <SelectTrigger className="h-11 w-full rounded-xl">
            <SelectValue placeholder="انتخاب کالا" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">حداقل درصد تخفیف</span>
            <span className="font-bold text-accent">٪{toFa(threshold)}</span>
          </div>
          <Slider
            value={[threshold]}
            onValueChange={(v) => setThreshold(v[0] ?? 10)}
            min={5}
            max={60}
            step={5}
            dir="rtl"
          />
        </div>

        <Button onClick={add} variant="secondary" className="w-full rounded-xl">
          <BellPlus className="size-4" />
          ثبت هشدار
        </Button>
      </div>

      {alerts.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-border pt-4">
          {alerts.map((a) => {
            const p = products.find((x) => x.id === a.productId);
            return (
              <li
                key={a.id}
                className="flex items-center justify-between gap-2 rounded-xl bg-secondary px-3 py-2 text-sm"
              >
                <span className="truncate">
                  {p?.name} — تخفیف ٪{toFa(a.threshold)} به بالا
                </span>
                <button
                  type="button"
                  onClick={() => setAlerts((list) => list.filter((x) => x.id !== a.id))}
                  className="grid size-6 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-background"
                  aria-label="حذف هشدار"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
