-- Creación de la tabla de Vehículos (Módulo A: Catálogo y Estado)
CREATE TABLE vehiculos (
    id_vehiculo VARCHAR(20) NOT NULL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    estado_operativo VARCHAR(30) NOT NULL,
    nivel_bateria INT CHECK (nivel_bateria BETWEEN 0 AND 100),
    tarifa_base DECIMAL(5,2) NOT NULL
);

-- Creación de la tabla de Reservaciones (Módulo B: Gestión de Reservas)
CREATE TABLE reservaciones (
    id_reserva VARCHAR(30) NOT NULL PRIMARY KEY,
    id_vehiculo VARCHAR(20) NOT NULL,
    id_usuario VARCHAR(50) NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    estado_reserva VARCHAR(30) NOT NULL,
    CONSTRAINT fk_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo)
);

-- Inserción de datos de prueba iniciales
INSERT INTO vehiculos (id_vehiculo, tipo, estado_operativo, nivel_bateria, tarifa_base)
VALUES ('VEH-001', 'Bicicleta Eléctrica', 'Disponible', 85, 15.00);

INSERT INTO vehiculos (id_vehiculo, tipo, estado_operativo, nivel_bateria, tarifa_base)
VALUES ('VEH-002', 'Scooter Eléctrico', 'En_Revision', 40, 12.00);
