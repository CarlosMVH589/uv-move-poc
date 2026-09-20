# UV Move API

API intermedia entre React, Supabase Auth e IBM Db2.

## Arranque local

1. Copia `.env.example` a `.env` y ajusta `DB2_UID` y `DB2_PWD`.
2. Instala dependencias con `npm install` dentro de `backend/`.
3. Inicia la API con `npm run dev`.

La API espera Db2 en `localhost:50000`, usa la base `UVMOVE` y escucha en `http://localhost:3000`.

El archivo `backend/.env` es obligatorio. Copia `.env.example` y establece `DB2_PWD` con la contraseña de `db2inst1` configurada en el contenedor. No uses la contraseña de Supabase: son credenciales distintas.

## Prueba rápida

La prueba automatizada usa una base de datos simulada inyectada en `createApp`, por lo que no requiere Db2:

```bash
npm run test:api
```

También se puede ejecutar con `npm test`. La prueba verifica el catálogo (`200`), el rechazo de un UUID inválido (`400`) y una reserva válida (`201`), incluyendo los parámetros enviados a la inserción.

Para probar contra Db2 local, inicia primero la API con `npm run dev` y usa:

```bash
curl -i http://localhost:3000/api/vehiculos
curl -i -X POST http://localhost:3000/api/reservaciones \
  -H 'Content-Type: application/json' \
  -d '{"id_vehiculo":"VEH-001","id_usuario":"25ecdc1a-f56a-455c-8077-b28ed9fef3aa"}'
```

## Endpoints

### `GET /api/vehiculos`

Devuelve los registros de `vehiculos` cuyo `estado_operativo` es `Disponible`.

### `POST /api/reservaciones`

Body mínimo:

```json
{
  "id_vehiculo": "VEH-001",
  "id_usuario": "25ecdc1a-f56a-455c-8077-b28ed9fef3aa"
}
```

También acepta `fecha_inicio` en formato ISO 8601. El servidor genera `id_reserva` y guarda la reserva con estado `Activa`.

### `GET /health`

Comprueba la conexión con Db2.