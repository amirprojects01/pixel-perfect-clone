import { products, stores, unitPrice, type Product, type StoreId } from "@/data/catalog";

export type BasketItem = { id: string; qty: number };

export type StoreQuote = {
  storeId: StoreId;
  productsTotal: number;
  deliveryFee: number;
  total: number;
  available: { product: Product; qty: number; price: number }[];
  missing: Product[];
};

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function quoteBasket(basket: BasketItem[]): StoreQuote[] {
  return stores.map((store) => {
    const available: StoreQuote["available"] = [];
    const missing: Product[] = [];
    let productsTotal = 0;

    for (const item of basket) {
      const product = getProduct(item.id);
      if (!product) continue;
      const price = unitPrice(product, store.id);
      if (price === null) {
        missing.push(product);
        continue;
      }
      productsTotal += price * item.qty;
      available.push({ product, qty: item.qty, price });
    }

    const deliveryFee = basket.length > 0 ? store.deliveryFee : 0;
    return {
      storeId: store.id,
      productsTotal,
      deliveryFee,
      total: productsTotal + deliveryFee,
      available,
      missing,
    };
  });
}

export function rankQuotes(quotes: StoreQuote[]) {
  const sorted = [...quotes].sort((a, b) => {
    if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
    return a.total - b.total;
  });
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  return { best, saving: worst && best ? Math.max(0, worst.total - best.total) : 0 };
}
