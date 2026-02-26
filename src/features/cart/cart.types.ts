export type Money = { amount: number; currency: "USD" };

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  variantName?: string;
  unitPrice: Money;
  imageUrl?: string;
  quantity: number;
};