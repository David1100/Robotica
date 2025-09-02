"use client";
import { useCartStore } from "@/hooks/useCart";
import { useState } from "react";

export default function AddToCartCourse({ product }) {
    const { addToCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const params = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;

    const yaInscrito = params?.get("yaInscrito");

    const textBtn = yaInscrito === 'false' ? `Empieza tu misión por $ 80.000` : `Ingresar al curso`;

    const productWithPrice = {
        ...product,
        price: 80000,
        category: 'courses',
    };

    const handleAddToCart = async () => {
        if (yaInscrito !== 'false') {
            window.open(
                `https://www.capacitate.com.co/moodle40/course/view.php?id=${product.id}`,
                "_blank" // abre en una pestaña nueva
            );
            return;
        }
        setLoading(true);
        try {
            // simular proceso (ej: API call o delay)
            await new Promise(resolve => setTimeout(resolve, 800));
            addToCart(productWithPrice);
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
                    textBtn
                )}
            </button>
        </>
    );
}
