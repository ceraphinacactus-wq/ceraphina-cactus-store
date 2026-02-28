// src/features/shop/shop.types.ts
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
  images?: {
    url: string;
    alt?: string;
};

// Back-compat alias (your ShopPage was importing UiProduct)
export type UiProduct = ShopProduct;

export type SquareCatalogResponse = {
  objects?: any[];
  latest_time?: string;
};