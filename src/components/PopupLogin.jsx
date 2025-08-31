import { getData, getDataLogin } from "@/utils/fetchData";
import { functionToken, setUserCookie } from "@/utils/functions";
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
      // 1. Login a Moodle
      const res = await getDataLogin(
        `service=moodle_mobile_app&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      if (!res) {
        setError("El servidor no respondió. Inténtalo más tarde.");
        return;
      }

      // 2. Verificar si hubo error en la respuesta
      if (res.error || res.errorcode) {
        setError(res.error || "Credenciales inválidas.");
        return;
      }

      // 3. Obtener info del usuario
      const resUser = await getData(
        `?wstoken=${functionToken(res.token)}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`
      );

      if (!resUser) {
        setError("No se pudo obtener la información del usuario.");
        return;
      }

      // Guardar token real en localStorage
      const userData = { number: resUser.userid, text: resUser.username };
      const encoded = btoa(JSON.stringify(userData));
      localStorage.setItem("_f", encoded);

      setUserCookie(encoded);
      window.location.reload(); // 🔄 recargar la página

      // Cerrar popup
      onClose();

    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError("Error inesperado. Inténtalo más tarde.");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <div className="relative w-[90%] lg:w-[35%] max-w-md">
        <div className="bg-white/50 rounded-lg flex flex-col items-center px-4 py-10 w-full">
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
