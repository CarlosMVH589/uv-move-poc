# Contrato de Integración y Esquema de Datos - UV Move

Este documento define los acuerdos de integración entre la capa de persistencia (IBM Db2) y el frontend (React / Supabase Auth) para la PoC de **UV Move**.

## 1. Convenciones Generales
- **Motor de Base de Datos:** IBM Db2 (Entorno Local / Docker).
- **Servicio de Autenticación:** Supabase Auth (Nube).
- **Codificación de Caracteres:** UTF-8.

---

## 2. Esquema de Tablas (IBM Db2)

### Tabla: `vehiculos` (Módulo A: Catálogo y Estado)
| Columna | Tipo de Dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id_vehiculo` | VARCHAR(20) | `NOT NULL`, `PRIMARY KEY` | Identificador único del vehículo (Ej: `VEH-001`). |
| `tipo` | VARCHAR(50) | `NOT NULL` | Tipo de vehículo (`Bicicleta Eléctrica`, `Scooter Eléctrico`, etc.). |
| `estado_operativo`| VARCHAR(30) | `NOT NULL` | Estado actual: `Disponible`, `En_Revision`, `Reservado`. |
| `nivel_bateria` | INT | `CHECK (BETWEEN 0 AND 100)` | Porcentaje de batería disponible. |
| `tarifa_base` | DECIMAL(5,2) | `NOT NULL` | Costo base por uso o tiempo. |

### Tabla: `reservaciones` (Módulo B: Gestión de Reservas)
| Columna | Tipo de Dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id_reserva` | VARCHAR(30) | `NOT NULL`, `PRIMARY KEY` | Identificador único de la reserva (Ej: `RES-001`). |
| `id_vehiculo` | VARCHAR(20) | `NOT NULL`, `FOREIGN KEY` | Relación con la tabla `vehiculos`. |
| `id_usuario` | VARCHAR(50) | `NOT NULL` | **Mapeo Supabase:** Almacena el UUID del usuario autenticado. |
| `fecha_inicio` | TIMESTAMP | `NOT NULL` | Marca de tiempo del inicio de la reserva. |
| `estado_reserva` | VARCHAR(30) | `NOT NULL` | Estado de la reserva: `Activa`, `Completada`, `Cancelada`. |

---

## 3. Mapeo de Identidad (Supabase Auth ↔ Db2)
- El campo `id_usuario` en la tabla `reservaciones` está diseñado para recibir los UUIDs generados automáticamente por Supabase Auth en el panel de administración (ej. `25ecdc1a-f56a-455c-8077-b28ed9fef3aa`).
- Cualquier consulta o inserción realizada desde el frontend que involucre a un usuario deberá suministrar este identificador exacto.
