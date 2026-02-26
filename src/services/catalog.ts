export type SquareMoney = {
  amount?: number; // cents
  currency?: string;
};

export type SquareCatalogObject = {
  type: string;
  id: string;
  updated_at?: string;
  created_at?: string;
  version?: number;
  is_deleted?: boolean;
  present_at_all_locations?: boolean;
  item_data?: {
    name?: string;
    description?: string;
    variations?: Array<{
      type?: string;
      id?: string;
      item_variation_data?: {
        name?: string;
        price_money?: SquareMoney;
        sellable?: boolean;
        stockable?: boolean;
        track_inventory?: boolean;
        pricing_type?: string;
      };
    }>;
    image_ids?: string[];
    categories?: any[];
  };
  image_data?: {
    url?: string;
    name?: string;
  };
};

export type CatalogResponse = {
  objects?: SquareCatalogObject[];
  latest_time?: string;
};

export type UiProduct = {
  id: string;
  variationId: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  currency: string;
  imageUrl?: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(cents: number, currency = "USD") {
  const dollars = (cents ?? 0) / 100;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(dollars);
}

export async function fetchCatalog(): Promise<CatalogResponse> {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) throw new Error("Missing VITE_API_BASE_URL");
  const res = await fetch(`${base}/api/catalog`, { method: "GET" });
  const data = (await res.json()) as any;
  if (!res.ok) {
    const msg = data?.errors?.[0]?.detail || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as CatalogResponse;
}

export function mapCatalogToProducts(resp: CatalogResponse): UiProduct[] {
  const objects = resp.objects ?? [];

  // Build image lookup table (Square returns IMAGE objects separately)
  const imageById = new Map<string, string>();
  for (const obj of objects) {
    if (obj.type === "IMAGE" && obj.id && obj.image_data?.url) {
      imageById.set(obj.id, obj.image_data.url);
    }
  }

  // Map ITEM -> UiProduct
  const products: UiProduct[] = [];
  for (const obj of objects) {
    if (obj.type !== "ITEM") continue;
    const item = obj.item_data;
    const name = item?.name?.trim() || "Untitled";
    const desc = item?.description || "";
    const firstVar = item?.variations?.[0];
    const variationId = firstVar?.id || "";
    const money = firstVar?.item_variation_data?.price_money;
    const priceCents = Number(money?.amount ?? 0);
    const currency = money?.currency || "USD";

    // Basic “sellable” guard
    const sellable = firstVar?.item_variation_data?.sellable;
    if (sellable === false) continue;

    const imageId = item?.image_ids?.[0];
    const imageUrl = imageId ? imageById.get(imageId) : undefined;

    products.push({
      id: obj.id,
      variationId,
      name,
      slug: slugify(name),
      description: desc,
      priceCents,
      currency,
      imageUrl,
    });
  }

  // Sort alphabetically for now (simple + stable)
  products.sort((a, b) => a.name.localeCompare(b.name));
  return products;
}