import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart.types";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items.slice();
        const idx = items.findIndex((x) => x.variantId === item.variantId);
        if (idx >= 0) items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
        else items.push(item);
        set({ items });
      },
      removeItem: (variantId) => set({ items: get().items.filter((x) => x.variantId !== variantId) }),
      setQty: (variantId, qty) =>
        set({
          items: get().items.map((x) => (x.variantId === variantId ? { ...x, quantity: Math.max(1, qty) } : x)),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "cc_cart_v1" }
  )
);