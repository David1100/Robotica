import { useEffect, useState } from "react";

export default function PopupLogin({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        `https://www.capacitate.com.co/moodle40/login/token.php?service=moodle_mobile_app&username=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        console.log("✅ Login exitoso:", data);
        // Guardar el token en localStorage o context
        localStorage.setItem("moodle_token", data.token);
        onClose();
      }
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <div className="relative w-[90%] lg:w-[35%] max-w-md">
        <div className="bg-white/50 rounded-lg flex flex-col items-center px-4 py-20 w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white text-xl hover:scale-105 transition-all"
          >
            ✖
          </button>
          <div className="bg-bgPrimary p-3 rounded-lg">
            <img src="/favicon.svg" width={40} alt="" />
          </div>
          <div className="text-center mt-4 mb-6">
            <h1 className="text-xl font-semibold">Iniciar sesión</h1>
            <p className="text-gray-600">Accede a la academia de Capacitate</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[80%] flex flex-col gap-3"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Usuario:</label>
              <input
                required
                className="w-full px-3 py-2 bg-gray-200 rounded-lg text-slate-500 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-bgPrimary/50 focus:border-bgPrimary/50 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input
                required
                className="w-full px-3 py-2 bg-gray-200 rounded-lg text-slate-500 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-bgPrimary/50 focus:border-bgPrimary/50 transition-all text-sm"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-700/70 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="text-white bg-bgPrimary px-4 py-2 rounded-lg hover:scale-105 transition-all"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
