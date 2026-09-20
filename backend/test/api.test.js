import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { createApp } from "../src/app.js";

const userId = "25ecdc1a-f56a-455c-8077-b28ed9fef3aa";
const startDate = "2026-09-19T12:00:00.000Z";

function createDatabaseMock() {
  const calls = [];

  return {
    calls,
    async query(sql, params = []) {
      calls.push({ sql, params });

      if (sql.includes("WHERE id_vehiculo = ?")) {
        return [{ id_vehiculo: "VEH-001" }];
      }

      return [{
        id_vehiculo: "VEH-001",
        tipo: "Bicicleta Eléctrica",
        estado_operativo: "Disponible",
        nivel_bateria: 85,
        tarifa_base: 15,
      }];
    },
  };
}

function createUppercaseDatabaseMock() {
  return {
    async query() {
      return [{
        ID_VEHICULO: "VEH-001",
        TIPO: "Bicicleta Eléctrica",
        ESTADO_OPERATIVO: "Disponible",
        NIVEL_BATERIA: 85,
        TARIFA_BASE: 15,
      }];
    },
  };
}

describe("API de UV Move", () => {
  let server;
  let baseUrl;
  let database;

  before(() => {
    database = createDatabaseMock();
    server = createApp(database).listen(0);
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(() => {
    server.close();
  });

  it("GET /api/vehiculos devuelve el catálogo completo con 200", async () => {
    const response = await fetch(`${baseUrl}/api/vehiculos`);
    const vehicles = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(vehicles, [{
      id_vehiculo: "VEH-001",
      tipo: "Bicicleta Eléctrica",
      estado_operativo: "Disponible",
      nivel_bateria: 85,
      tarifa_base: 15,
    }]);
  });

  it("GET /api/vehiculos normaliza columnas Db2 en mayúsculas", async () => {
    const uppercaseServer = createApp(createUppercaseDatabaseMock()).listen(0);
    const uppercaseUrl = `http://127.0.0.1:${uppercaseServer.address().port}`;

    try {
      const response = await fetch(`${uppercaseUrl}/api/vehiculos`);
      const vehicles = await response.json();

      assert.equal(response.status, 200);
      assert.equal(vehicles[0].id_vehiculo, "VEH-001");
      assert.equal(vehicles[0].tipo, "Bicicleta Eléctrica");
      assert.equal(vehicles[0].nivel_bateria, 85);
    } finally {
      uppercaseServer.close();
    }
  });

  it("POST /api/reservaciones rechaza un UUID inválido con 400", async () => {
    const response = await fetch(`${baseUrl}/api/reservaciones`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id_vehiculo: "VEH-001", id_usuario: "no-es-un-uuid" }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.match(body.error, /UUID válido/);
    assert.equal(database.calls.length, 1);
  });

  it("POST /api/reservaciones registra una reserva con 201", async () => {
    const response = await fetch(`${baseUrl}/api/reservaciones`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id_vehiculo: "VEH-001",
        id_usuario: userId,
        fecha_inicio: startDate,
      }),
    });
    const reservation = await response.json();
    const insertCall = database.calls.at(-1);

    assert.equal(response.status, 201);
    assert.match(reservation.id_reserva, /^RES-[a-f0-9]{26}$/);
    assert.deepEqual(reservation, {
      id_reserva: reservation.id_reserva,
      id_vehiculo: "VEH-001",
      id_usuario: userId,
      fecha_inicio: startDate,
      estado_reserva: "Activa",
    });
    assert.deepEqual(insertCall.params.slice(1), ["VEH-001", userId, "2026-09-19-12.00.00.000"]);
    assert.match(insertCall.sql, /VALUES \(\?, \?, \?, \?, 'Activa'\)/);
  });
});