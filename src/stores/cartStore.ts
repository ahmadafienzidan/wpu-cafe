import { create } from "zustand";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "notes">) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateNotes: (menuItemId: string, notes: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.menuItemId === item.menuItemId);
      if (existing) {
        return {
          items: state.items.map((i) => (i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + 1 } : i)),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1, notes: "" }] };
    }),
  removeItem: (menuItemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.menuItemId !== menuItemId),
    })),
  updateQuantity: (menuItemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i)),
    })),
  updateNotes: (menuItemId, notes) =>
    set((state) => ({
      items: state.items.map((i) => (i.menuItemId === menuItemId ? { ...i, notes } : i)),
    })),
  clearCart: () => set({ items: [] }),
}));
