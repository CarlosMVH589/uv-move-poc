const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error ?? "No se pudo completar la solicitud");
    error.status = response.status;
    throw error;
  }
  return data;
}

export function getAvailableVehicles() {
  return request("/api/vehiculos");
}

export function createReservation({ vehicleId, userId, startDate }) {
  return request("/api/reservaciones", {
    method: "POST",
    body: JSON.stringify({
      id_vehiculo: vehicleId,
      id_usuario: userId,
      ...(startDate ? { fecha_inicio: startDate } : {}),
    }),
  });
}