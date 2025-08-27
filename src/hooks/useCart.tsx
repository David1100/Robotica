import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Product = {
    id: number;
    price: number;
    cantidad: number;
    name: string;
}

type CartStore = {
    cart: Product[];
    addToCart: (product: Product) => void;
    deleteToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product: Product) => {
                const cart = get().cart;
                const existingProduct = cart.find((p) => p.id === product.id);

                if (existingProduct) {
                    const updatedCart = cart.map((p) =>
                        p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p
                    );
                    set({ cart: updatedCart });
                } else {
                    set({ cart: [...cart, { ...product, cantidad: 1 }] });
                }
            },
            deleteToCart: (product: Product) => {
                const cart = get().cart;
                const existingProduct = cart.find((p) => p.id === product.id);

                if (existingProduct) {
                    if (existingProduct.cantidad > 1) {
                        // Resta uno
                        const updatedCart = cart.map((p) =>
                            p.id === product.id ? { ...p, cantidad: p.cantidad - 1 } : p
                        );
                        set({ cart: updatedCart });
                    } else {
                        // Si la cantidad es 1, elimínalo del carrito
                        const updatedCart = cart.filter((p) => p.id !== product.id);
                        set({ cart: updatedCart });
                    }
                }
            },
            removeFromCart: (id: number) => {
                const updatedCart = get().cart.filter((p) => p.id !== id);
                set({ cart: updatedCart });
            },

            clearCart: () => {
                set({ cart: [] });
            },

            totalItems: () => {
                return get().cart.reduce((total, p) => total + p.cantidad, 0);
            },

            totalPrice: () => {
                return get().cart.reduce((total, p) => total + p.price * p.cantidad, 0);
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
