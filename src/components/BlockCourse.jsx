'use client'

export default function BlockCourse({ slug, resDetail }) {
    const params = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;

    const yaInscrito = params?.get("yaInscrito");

    const item_detalles = [
        { text: "Acceso a la plataforma educativa" },
        { text: "4 Retos prácticos con LEGO WeDo 2.0" },
        { text: "Acompañamiento durante toda la misión" },
        { text: "Certificación digital al finalizar" },
    ];

    return (
        <>
            {
                yaInscrito === 'false' && (
                    <div className="px-4 py-12 lg:px-12 lg:py-12 relative backdrop-blur-xs rounded-xl shadow-lg shadow-bgPrimary/30">
                        <img src="/icons/certificate.svg" width={60} alt="" className="text-bgPrimary absolute right-4 top-2 animate-tada animate-iteration-count-infinite" />

                        {/* Imagen difuminada de fondo */}
                        <div className="absolute inset-0 -z-10">
                            <img
                                src={resDetail.courseimage}
                                alt="Fondo"
                                className="w-full h-full object-cover blur-xs opacity-40"
                            />
                        </div>

                        <span className="text-bgPrimary drop-shadow-md text-sm font-semibold">
                            Aplica solo para estudiantes con kit Workstation.
                        </span>

                        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 leading-tight drop-shadow-md text-balance">
                            Compra para desbloquear esta{" "}
                            <span className="text-bgPrimary">misión</span>
                        </h1>

                        <h2 className="text-lg drop-shadow-md text-gray-600">
                            Desata tu potencial en robótica y accede a formación exclusiva.
                        </h2>

                        <div className="mt-4 grid grid-cols-2 gap-2 lg:text-sm text-xs drop-shadow-md">
                            {item_detalles.map((item, index) => (
                                <div key={index} className="border-[1px] border-bgPrimary/10 p-2 rounded-lg bg-bgPrimary text-white flex items-center gap-1 hover:scale-105 transition-all ">
                                    <img src="/icons/check.svg" width={22} alt="" className="" />
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </>


    )
}