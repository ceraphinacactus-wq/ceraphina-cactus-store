export type Money = { amount: number; currency: string };

export type ShopVariant = {
  id: string;
  name: string;
  price: Money | null;
  sellable?: boolean;
  stockable?: boolean;
};

export type ShopProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  variants: ShopVariant[];
  defaultVariant?: ShopVariant;
};

export type SquareCatalogResponse = {
  objects?: any[];
  latest_time?: string;
};