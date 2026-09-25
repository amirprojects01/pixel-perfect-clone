export type StoreId = "snapp" | "digijet" | "okala";

export type Store = {
  id: StoreId;
  name: string;
  short: string;
  deliveryFee: number;
  tone: string; // tailwind-safe token class suffix
};

export const stores: Store[] = [
  { id: "snapp", name: "اسنپ‌اکسپرس", short: "SE", deliveryFee: 29000, tone: "brand-snapp" },
  { id: "digijet", name: "دیجی‌کالا جت", short: "DJ", deliveryFee: 19000, tone: "brand-digijet" },
  { id: "okala", name: "اُکالا", short: "OK", deliveryFee: 35000, tone: "brand-okala" },
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  unit: string;
  category: string;
  /** null = ناموجود در این فروشگاه */
  prices: Record<StoreId, number | null>;
  /** درصد تخفیف در هر فروشگاه */
  discounts?: Partial<Record<StoreId, number>>;
};

export const products: Product[] = [
  {
    id: "milk-kale",
    name: "شیر کم‌چرب کاله",
    brand: "کاله",
    unit: "۱ لیتری",
    category: "لبنیات",
    prices: { snapp: 42000, digijet: 39500, okala: 41000 },
    discounts: { digijet: 10 },
  },
  {
    id: "oil-bahar",
    name: "روغن سرخ کردنی بهار",
    brand: "بهار",
    unit: "۱٫۶ لیتری",
    category: "خواربار",
    prices: { snapp: 189000, digijet: 195000, okala: 178000 },
    discounts: { okala: 12 },
  },
  {
    id: "cheese-sabah",
    name: "پنیر سفید صباح",
    brand: "صباح",
    unit: "۴۰۰ گرمی",
    category: "لبنیات",
    prices: { snapp: 96000, digijet: 92000, okala: null },
  },
  {
    id: "egg",
    name: "تخم مرغ بسته‌ای",
    brand: "تلاونگ",
    unit: "۹ عددی",
    category: "پروتئین",
    prices: { snapp: 118000, digijet: 112000, okala: 115000 },
    discounts: { snapp: 5 },
  },
  {
    id: "rice-hashemi",
    name: "برنج هاشمی درجه یک",
    brand: "گلستان",
    unit: "۵ کیلوگرم",
    category: "خواربار",
    prices: { snapp: 1250000, digijet: 1190000, okala: 1230000 },
    discounts: { digijet: 7 },
  },
  {
    id: "mince-meat",
    name: "گوشت چرخ‌کرده مخلوط",
    brand: "پویا پروتئین",
    unit: "۵۰۰ گرمی",
    category: "پروتئین",
    prices: { snapp: 385000, digijet: null, okala: 369000 },
    discounts: { okala: 8 },
  },
  {
    id: "chicken",
    name: "ران مرغ بدون پوست",
    brand: "مهیا پروتئین",
    unit: "۹۰۰ گرمی",
    category: "پروتئین",
    prices: { snapp: 172000, digijet: 168000, okala: 175000 },
  },
  {
    id: "yogurt",
    name: "ماست موسیر دومینو",
    brand: "دومینو",
    unit: "۲۵۰ گرمی",
    category: "لبنیات",
    prices: { snapp: 58000, digijet: 55000, okala: 54000 },
  },
  {
    id: "tea-golestan",
    name: "چای کیسه‌ای گلستان",
    brand: "گلستان",
    unit: "۱۰۰ عددی",
    category: "نوشیدنی",
    prices: { snapp: 198000, digijet: 205000, okala: 192000 },
    discounts: { okala: 15 },
  },
  {
    id: "tomato",
    name: "رب گوجه‌فرنگی چین‌چین",
    brand: "چین‌چین",
    unit: "۸۰۰ گرمی",
    category: "خواربار",
    prices: { snapp: 132000, digijet: 128000, okala: 135000 },
  },
  {
    id: "banana",
    name: "موز درجه یک",
    brand: "میوه تازه",
    unit: "۱ کیلوگرم",
    category: "میوه و سبزی",
    prices: { snapp: 145000, digijet: 139000, okala: 142000 },
  },
  {
    id: "cucumber",
    name: "خیار سالادی",
    brand: "میوه تازه",
    unit: "۱ کیلوگرم",
    category: "میوه و سبزی",
    prices: { snapp: 68000, digijet: 72000, okala: 65000 },
  },
  {
    id: "detergent",
    name: "مایع ظرفشویی پریل",
    brand: "پریل",
    unit: "۱ لیتری",
    category: "شوینده",
    prices: { snapp: 149000, digijet: 142000, okala: 147000 },
    discounts: { digijet: 20 },
  },
  {
    id: "pasta",
    name: "ماکارونی زر ماکارون",
    brand: "زر",
    unit: "۷۰۰ گرمی",
    category: "خواربار",
    prices: { snapp: 42000, digijet: 39000, okala: 40500 },
  },
  {
    id: "butter",
    name: "کره حیوانی پاک",
    brand: "پاک",
    unit: "۱۰۰ گرمی",
    category: "لبنیات",
    prices: { snapp: 72000, digijet: 69000, okala: null },
  },
  {
    id: "juice",
    name: "آبمیوه پرتقال سن‌ایچ",
    brand: "سن‌ایچ",
    unit: "۱ لیتری",
    category: "نوشیدنی",
    prices: { snapp: 88000, digijet: 84000, okala: 86000 },
  },
];

export const popularIds = ["milk-kale", "egg", "cheese-sabah", "oil-bahar", "rice-hashemi", "banana"];

export const toFa = (n: number) =>
  n.toLocaleString("fa-IR", { maximumFractionDigits: 0 });

export function unitPrice(p: Product, store: StoreId): number | null {
  const base = p.prices[store];
  if (base === null || base === undefined) return null;
  const d = p.discounts?.[store] ?? 0;
  return Math.round((base * (100 - d)) / 100);
}
