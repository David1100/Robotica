'use client'
import { useCartStore } from "@/hooks/useCart";
import { formatPrice } from "@/utils/functions";
import { useEffect, useState } from "react";

export default function CartShopping() {
    const { cart, totalPrice, addToCart, deleteToCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirigir al home si el carrito está vacío
    useEffect(() => {
        if (mounted && cart.length === 0) {
            window.location.href = "/";
        }
    }, [mounted, cart]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="grid lg:grid-cols-5 grid-cols-1 mt-6 gap-3">
            <div className="col-span-3">
                <ul>
                    {cart.map((item, index) => (
                        <li
                            key={index}
                            className="border-b-[1px] border-bgPrimary/10 drop-shadow-sm py-2 px-4 flex gap-2 justify-between items-center text-gray-700 lg:text-lg text-base"
                        >
                            {item.name}
                            <span className="flex gap-2 text-sm">
                                <button onClick={() => deleteToCart(item)}>{ item.cantidad == 1 ? '🗑️' : '-' }</button>
                                <span className="text-bgPrimary">{item.cantidad}</span>
                                <button onClick={() => addToCart(item)}>+</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-span-2">
                <div className="p-6 rounded-lg bg-bgPrimary backdrop-blur-lg text-white">
                    <div className="flex justify-between gap-5 my-4">
                        <p className="text-xl drop-shadow-md">Total</p>
                        <p className="text-lg">$ {formatPrice(totalPrice().toString())}</p>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button className="bg-white text-bgPrimary w-full py-2 rounded-lg text-sm mt-3 hover:scale-105 transition-all drop-shadow-md">
                            Iniciar compra 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
