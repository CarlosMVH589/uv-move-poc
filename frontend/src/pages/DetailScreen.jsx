import { useState } from "react";
import { IconBike, IconScooter } from "../components/Icons";
import { BackHeader, InfoRow, BottomNav } from "../components/LayoutComponents";
import { createReservation } from "../services/uvMoveApi";

function VehicleIcon({ type, size = 80 }) {
  return type.toLowerCase().includes("scooter")
    ? <IconScooter size={size} color="#1a4fa0" />
    : <IconBike size={size} color="#1a4fa0" />;
}

export default function DetailScreen({ navigate, vehicle, userId, onReserved }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isAvailable = vehicle?.estado_operativo?.toUpperCase() === "DISPONIBLE";

  if (!vehicle) return null;

  async function handleReservation() {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const reservation = await createReservation({ vehicleId: vehicle.id_vehiculo, userId });
      onReserved(reservation);
    } catch (error) {
      if (error.status === 409) navigate("unavailable");
      else setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="uvm-detail">
      <BackHeader title="DETALLE DEL VEHÍCULO" onBack={() => navigate("explore")} />
      <div className="uvm-detail__body">
        <div className="uvm-detail__hero">
          <VehicleIcon type={vehicle.tipo} />
          <h2 className="uvm-detail__hero-name">{vehicle.tipo}</h2>
          <p className="uvm-detail__hero-name">{vehicle.id_vehiculo}</p>
          <div className="uvm-detail__hero-status">
            <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--md" />
            <span className="uvm-detail__hero-status-label">{vehicle.estado_operativo}</span>
          </div>
        </div>

        <div className="uvm-card uvm-detail__info-card">
          <InfoRow label="TIPO" value={vehicle.tipo} />
          <div className="uvm-card-divider" />
          <InfoRow label="BATERÍA" value={`${vehicle.nivel_bateria}%`} />
          <div className="uvm-card-divider" />
          <InfoRow label="TARIFA BASE" value={`$${Number(vehicle.tarifa_base).toFixed(2)}`} />
          <div className="uvm-card-divider" />
          <InfoRow label="ESTADO" value={vehicle.estado_operativo} valueClass="uvm-info-row__value--green" />
        </div>

        <div className="uvm-detail__divider" />
        <div className="uvm-detail__avail-box">
          <div className="uvm-detail__avail-row">
            <span className={`uvm-status-dot ${isAvailable ? "uvm-status-dot--green" : "uvm-status-dot--orange"} uvm-status-dot--sm`} />
            <span className="uvm-detail__avail-label">
              {isAvailable ? "Reserva disponible" : "Reserva no disponible"}
            </span>
          </div>
          <p className="uvm-detail__avail-note">
            {isAvailable ? "Vehículo disponible según el catálogo" : `Estado actual: ${vehicle.estado_operativo}`}
          </p>
        </div>

        {errorMessage && <p className="uvm-api-error">{errorMessage}</p>}
        <div className="uvm-detail__cta">
          <button
            className={`uvm-btn-primary uvm-btn-primary--lg${isAvailable ? "" : " uvm-btn-primary--disabled"}`}
            onClick={() => (isAvailable ? handleReservation() : navigate("unavailable"))}
            disabled={isSubmitting}
          >
            {isSubmitting ? "RESERVANDO..." : isAvailable ? "RESERVAR AHORA" : "VER NO DISPONIBILIDAD"}
          </button>
        </div>
      </div>
      <BottomNav active="none" navigate={navigate} />
    </div>
  );
}
