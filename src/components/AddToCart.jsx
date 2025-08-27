"use client";
import { useCartStore } from "@/hooks/useCart";
import { useState } from "react";

export default function AddToCart({ product, textoBtn }) {
    const { addToCart } = useCartStore();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            // simular proceso (ej: API call o delay)
            await new Promise(resolve => setTimeout(resolve, 800));
            addToCart(product);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="w-full bg-bgPrimary px-8 py-2 mt-4 rounded-lg hover:scale-105 transition-all text-white flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Procesando...
                    </>
                ) : (
                    `${textoBtn}`
                )}
            </button>
        </>
    );
}
