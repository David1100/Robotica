import { useState } from "react";
import PopupLogin from "./PopupLogin";

export default function BtnLogin() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && (
                <PopupLogin onClose={() => setIsOpen(false)} />
            )}
            <button
                class="hidden md:flex gap-2 items-center hover:bg-gray-200/30 transition-all duration-300 p-4 rounded-xl drop-shadow-md text-gray-700"
                onClick={() => setIsOpen(true)}
            >
                <div class="rounded-full bg-bgPrimary p-2">
                    <img src="/icons/user.svg" width="16" alt="" />
                </div>
                Iniciar sesión
            </button>
        </>
    )
}