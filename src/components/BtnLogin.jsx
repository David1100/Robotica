import { useState, useEffect } from "react";
import PopupLogin from "./PopupLogin";

export default function BtnLogin() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("_f");
        if (stored) {
            try {
                const decoded = JSON.parse(atob(stored));
                setUser(decoded);
            } catch (err) {
                console.error("Error al decodificar usuario:", err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("_f"); // ❌ eliminar del storage
        document.cookie = "_f=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        setUser(null); // 🔄 resetear estado
        window.location.href = '/'; // 🔄 recargar la página
    };

    return (
        <>
            {isOpen && <PopupLogin onClose={() => setIsOpen(false)} />}

            {user ? (
                // ✅ Usuario logueado → muestra su nombre
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 items-center bg-gray-100 p-4 rounded-xl text-gray-700 cursor-pointer hover:bg-gray-200/30" onClick={() => handleLogout()}>
                        <div className="rounded-full bg-bgPrimary p-2">
                            <img src="/icons/log-out.svg" width="16" alt="" />
                        </div>
                        Cerrar sesión
                    </div>
                </div>

            ) : (
                // ❌ No logueado → muestra botón de login

                <button
                    className="flex gap-2 items-center hover:bg-gray-200/30 transition-all duration-300 p-4 rounded-xl drop-shadow-md text-gray-700"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="rounded-full bg-bgPrimary p-2">
                        <img src="/icons/user.svg" width="16" alt="" />
                    </div>
                    Iniciar sesión
                </button>

            )}
        </>
    );
}
