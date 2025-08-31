
import { functionGetUser } from "./functions";

const BASE_URL = import.meta.env.PUBLIC_BACKEND;
const BASE_URL_LOGIN = import.meta.env.PUBLIC_LOGIN;
const JWT_SECRET = import.meta.env.JWT_SECRET;

export async function getData(url: any) {

    try {
        const response = await fetch(
            `${BASE_URL}${url}`,
            {
                method: "GET"
            },
        )

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en getData:', error);
        return null;
    }
}

export async function getDataUser(url: string, cookieHeader?: string) {
    const user = functionGetUser(cookieHeader);
    if (!user) return null;

    try {
        const response = await fetch(
            `${BASE_URL}${url}&userid=${user.number}`,
            {
                method: "GET"
            },
        )

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en getData:', error);
        return null;
    }
}

export async function getDataLogin(url: string) {
    try {
        const response = await fetch(`${BASE_URL_LOGIN}${url}`, { method: "GET" });

        if (!response.ok) {
            // Error de red o status HTTP
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();

        // Si Moodle devuelve error explícito
        if (data.error || data.errorcode) {
            return {
                error: data.error || "Error desconocido en Moodle",
                errorcode: data.errorcode || null
            };
        }

        return data;
    } catch (error) {
        console.error("⚠️ Error en getDataLogin:", error);
        return { error: "No se pudo conectar con el servidor." };
    }
}





