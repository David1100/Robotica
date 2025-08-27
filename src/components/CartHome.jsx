"use client";
import { useCartStore } from "@/hooks/useCart";
import { useEffect, useState } from "react";

export default function CartHome() {
    const { totalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        totalItems() > 0 && (
            <a href="/carrito" className="relative bg-bgPrimary p-2 rounded-full shadow-lg animate-blurred-fade-in">
                <img src="/icons/shopping-cart.svg" width={20} height={20} alt="Carrito" />
                <span className="absolute -top-0 -right-1 flex items-center justify-center h-4 w-4 text-[10px] font-bold rounded-full bg-white text-bgPrimary">
                    {totalItems()}
                </span>
            </a>
        )
    );
}
