import { useMemo, useRef, useState } from "react";
import { Search, Plus, Sparkles } from "lucide-react";
import { products, popularIds, toFa, unitPrice } from "@/data/catalog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onAdd: (id: string) => void;
  inBasket: (id: string) => boolean;
};

export function SearchAdd({ onAdd, inBasket }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return products
      .filter((p) => `${p.name} ${p.brand} ${p.category}`.includes(q))
      .slice(0, 6);
  }, [query]);

  const popular = popularIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft focus-within:ring-2 focus-within:ring-ring/40">
        <Search className="mr-2 size-5 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setOpen(false), 120);
          }}
          placeholder="جست‌وجوی کالا… مثلاً شیر کم‌چرب کاله"
          className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
        />
        <Button
          size="lg"
          className="hidden rounded-xl sm:inline-flex"
          onClick={() => results[0] && onAdd(results[0].id)}
          disabled={results.length === 0}
        >
          افزودن
        </Button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-lift animate-in fade-in-0 slide-in-from-top-2">
          {results.map((p) => {
            const cheapest = Math.min(
              ...(["snapp", "digijet", "okala"] as const)
                .map((s) => unitPrice(p, s))
                .filter((v): v is number => v !== null),
            );
            return (
              <button
                key={p.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onAdd(p.id);
                  setQuery("");
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-right transition-colors hover:bg-secondary"
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {p.brand} • {p.unit}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    از {toFa(cheapest)} تومان
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-primary">
                    <Plus className="size-4" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-accent" />
          پرخریدترین‌ها:
        </span>
        {popular.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onAdd(p.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-all active:scale-95 ${
              inBasket(p.id)
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary-soft/60"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
