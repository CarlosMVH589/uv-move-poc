import { IconWarning, IconBike, IconScooter } from "../components/Icons";
import { BackHeader, BottomNav } from "../components/LayoutComponents";

function VehicleIcon({ type, size = 32 }) {
  return type.toLowerCase().includes("scooter")
    ? <IconScooter size={size} color="#ea580c" />
    : <IconBike size={size} color="#ea580c" />;
}

export default function UnavailableScreen({ navigate, vehicle }) {
  return (
    <div className="uvm-unavailable">
      <BackHeader title="UV MOVE" onBack={() => navigate("explore")} />
      <div className="uvm-unavailable__body">
        <div className="uvm-unavailable__icon"><IconWarning /></div>
        <h1 className="uvm-unavailable__h1">VEHÍCULO NO DISPONIBLE</h1>
        <p className="uvm-unavailable__sub">El vehículo seleccionado ya no puede reservarse.</p>
        <div className="uvm-unavailable__vehicle-card">
          <div className="uvm-unavailable__vehicle-header">
            <VehicleIcon type={vehicle.tipo} />
            <p className="uvm-unavailable__vehicle-name">{vehicle.tipo} · {vehicle.id_vehiculo}</p>
          </div>
          <div className="uvm-unavailable__vehicle-divider" />
          <div className="uvm-unavailable__vehicle-status">
            <span className="uvm-status-dot uvm-status-dot--red uvm-status-dot--md" />
            <span className="uvm-status-label--red">Ya no está disponible</span>
          </div>
        </div>
        <div className="uvm-unavailable__error-box">
          <p className="uvm-unavailable__error-title">La reserva no fue creada.</p>
          <p className="uvm-unavailable__error-body">Actualiza el catálogo para consultar otros vehículos.</p>
        </div>
        <div className="uvm-unavailable__actions">
          <button className="uvm-btn-primary" onClick={() => navigate("explore")}>VER OTROS VEHÍCULOS</button>
          <button className="uvm-btn-ghost" onClick={() => navigate("explore")}>REGRESAR</button>
        </div>
      </div>
      <BottomNav active="none" navigate={navigate} />
    </div>
  );
}
