import { create } from 'zustand';

// ═══════════════════════════════════════════════
// Cart Store (Zustand)
// ═══════════════════════════════════════════════
// Client-side cart state with localStorage persistence.

export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find(i => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        isOpen: true,
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(i => i.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map(i =>
        i.id === id ? { ...i, quantity: Math.min(quantity, 10) } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  setIsOpen: (isOpen) => set({ isOpen }),

  get total() {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  get count() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },

  // Initiate Stripe Checkout
  checkout: async (email) => {
    const { items } = get();
    if (!items.length) return;

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            quantity: i.quantity,
          })),
          email,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    }
  },
}));
