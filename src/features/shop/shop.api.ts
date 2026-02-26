import { http } from "../../services/http";
import type { SquareCatalogResponse, ShopProduct } from "./shop.types";
import { slugify } from "./shop.utils";

function pickFirstImageUrl(obj: any): string | undefined {
  // If your Worker later expands images, handle it here.
  // For now, many Square ITEMS won’t have an image_url inline.
  return obj?.item_data?.image_url || undefined;
}

export async function fetchCatalogProducts(): Promise<ShopProduct[]> {
  const data = await http.get<SquareCatalogResponse>("/api/catalog");
  const objects = data.objects ?? [];

  const items = objects.filter((o) => o?.type === "ITEM");

  const products: ShopProduct[] = items.map((item: any) => {
    const itemData = item.item_data ?? {};
    const variations = (itemData.variations ?? []).map((v: any) => {
      const vd = v.item_variation_data ?? {};
      return {
        id: v.id,
        name: vd.name ?? "Default",
        price: vd.price_money ?? null,
        sellable: vd.sellable,
        stockable: vd.stockable,
      };
    });

    const defaultVariant = variations[0];

    return {
      id: item.id,
      name: itemData.name ?? "Unnamed item",
      slug: slugify(itemData.name ?? item.id),
      description: itemData.description ?? "",
      imageUrl: pickFirstImageUrl(item),
      variants: variations,
      defaultVariant,
    };
  });

  return products;
}