import crypto from "node:crypto";
import cors from "cors";
import express from "express";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function createReservationId() {
  return `RES-${crypto.randomUUID().replaceAll("-", "").slice(0, 26)}`;
}

function toDb2Timestamp(date) {
  return date.toISOString().replace("T", "-").replace("Z", "").replace(/:/g, ".");
}

function normalizeVehicle(vehicle) {
  return {
    id_vehiculo: vehicle.id_vehiculo ?? vehicle.ID_VEHICULO,
    tipo: vehicle.tipo ?? vehicle.TIPO,
    estado_operativo: vehicle.estado_operativo ?? vehicle.ESTADO_OPERATIVO,
    nivel_bateria: vehicle.nivel_bateria ?? vehicle.NIVEL_BATERIA,
    tarifa_base: vehicle.tarifa_base ?? vehicle.TARIFA_BASE,
  };
}

export function createApp(database) {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173" }));
  app.use(express.json());

  app.get("/health", async (_request, response) => {
    try {
      await database.query("SELECT 1 AS ok FROM SYSIBM.SYSDUMMY1");
      response.json({ status: "ok", database: "connected" });
    } catch {
      response.status(503).json({ status: "error", database: "unavailable" });
    }
  });

  app.get("/api/vehiculos", async (_request, response, next) => {
    try {
      const vehicles = await database.query(
        `SELECT id_vehiculo, tipo, estado_operativo, nivel_bateria, tarifa_base
         FROM vehiculos
         ORDER BY id_vehiculo`,
      );
      response.json(vehicles.map(normalizeVehicle));
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/reservaciones", async (request, response, next) => {
    const { id_vehiculo: vehicleId, id_usuario: userId, fecha_inicio: startDate } = request.body ?? {};

    if (typeof vehicleId !== "string" || vehicleId.trim() === "") {
      return response.status(400).json({ error: "id_vehiculo es obligatorio" });
    }
    if (typeof userId !== "string" || !uuidPattern.test(userId)) {
      return response.status(400).json({ error: "id_usuario debe ser un UUID válido" });
    }

    const reservationDate = startDate ? new Date(startDate) : new Date();
    if (Number.isNaN(reservationDate.getTime())) {
      return response.status(400).json({ error: "fecha_inicio debe ser una fecha válida" });
    }

    try {
      const vehicles = await database.query(
        `SELECT id_vehiculo
         FROM vehiculos
         WHERE id_vehiculo = ? AND UPPER(estado_operativo) = 'DISPONIBLE'`,
        [vehicleId.trim()],
      );

      if (vehicles.length === 0) {
        return response.status(409).json({ error: "El vehículo no existe o no está disponible" });
      }

      const reservationId = createReservationId();
      await database.query(
        `INSERT INTO reservaciones
          (id_reserva, id_vehiculo, id_usuario, fecha_inicio, estado_reserva)
         VALUES (?, ?, ?, ?, 'Activa')`,
        [reservationId, vehicleId.trim(), userId, toDb2Timestamp(reservationDate)],
      );

      response.status(201).json({
        id_reserva: reservationId,
        id_vehiculo: vehicleId.trim(),
        id_usuario: userId,
        fecha_inicio: reservationDate.toISOString(),
        estado_reserva: "Activa",
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: "Error interno de la API" });
  });

  return app;
}