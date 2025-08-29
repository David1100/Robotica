import { useState } from "react";
import PopupVideo from "../components/PopupVideo.jsx";

export default function VideoPp() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <>
      <div className="col-span-2 flex justify-center flex-col">
        <h1 className="text-4xl text-balance">
          Descubre cómo nace un{" "}
          <span className="text-bgPrimary font-semibold">Robot.</span>
        </h1>
        <p className="text-gray-400 text-2xl drop-shadow-md text-balance mt-3">
          Mira en acción cómo combinamos piezas, sensores y programación
          para dar vida a robots educativos. A través de ejemplos
          prácticos, aprenderás que la robótica no es complicada, sino
          divertida y llena de creatividad.
        </p>
      </div>

      <div className="col-span-2">
        <div
          className="relative w-full overflow-hidden rounded-4xl shadow-lg shadow-bgPrimary group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img
            src="images/foto.webp"
            className="transition-transform duration-500 group-hover:scale-110"
            alt="Robot demo"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="bg-gray-600 rounded-full p-4 shadow-lg">
              <img
                src="/icons/play.svg"
                className="w-6 h-6"
                alt="Reproducir"
              />
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <PopupVideo
          videoId="mSw7MiaNDNI"
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
