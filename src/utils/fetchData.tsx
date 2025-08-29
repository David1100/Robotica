const BASE_URL = import.meta.env.PUBLIC_BACKEND;

export async function getData(url: any) {

    try {
        const response = await fetch(
            `${BASE_URL}${url}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
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

export async function loginMoodle(username :string, password:string) {
  const url = "https://www.capacitate.com.co/moodle40/login/token.php";
  const params = new URLSearchParams({
    username,
    password,
    service: "capacitate" // o el servicio que creaste en Moodle
  });

  const res = await fetch(`${url}?${params.toString()}`);
  const data = await res.json();
  
  if (data.error) {
    throw new Error(data.error);
  }

  return data.token; // este token lo usas en las demás peticiones
}

