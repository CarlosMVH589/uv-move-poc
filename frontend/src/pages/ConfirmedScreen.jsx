import { IconCheck, IconBike, IconScooter } from "../components/Icons";
import { BottomNav } from "../components/LayoutComponents";

function VehicleIcon({ type, size = 32 }) {
  return type.toLowerCase().includes("scooter")
    ? <IconScooter size={size} color="#1a4fa0" />
    : <IconBike size={size} color="#1a4fa0" />;
}

export default function ConfirmedScreen({ navigate, vehicle, reservation }) {
  return (
    <div className="uvm-confirmed">
      <header className="uvm-header uvm-header--center">
        <span className="uvm-logo-uv">UV</span><span className="uvm-logo-move"> MOVE</span>
      </header>
      <div className="uvm-confirmed__body">
        <div className="uvm-confirmed__icon"><IconCheck /></div>
        <h1 className="uvm-confirmed__h1">¡RESERVA CONFIRMADA!</h1>
        <p className="uvm-confirmed__sub">Tu vehículo está reservado</p>
        <div className="uvm-card uvm-confirmed__res-card">
          <div className="uvm-confirmed__res-card-header">
            <VehicleIcon type={vehicle.tipo} />
            <p className="uvm-confirmed__res-card-name">{vehicle.tipo} · {vehicle.id_vehiculo}</p>
          </div>
          <div className="uvm-card-divider" />
          <div className="uvm-confirmed__res-card-row">
            <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--md" />
            <span className="uvm-status-label--green" style={{ fontSize: 14 }}>{reservation.estado_reserva}</span>
          </div>
          <div className="uvm-card-divider" />
          <div className="uvm-confirmed__res-id-wrap">
            <p className="uvm-confirmed__res-id-label">Reserva</p>
            <p className="uvm-confirmed__res-id-value">{reservation.id_reserva}</p>
          </div>
        </div>
        <div className="uvm-confirmed__actions">
          <button className="uvm-btn-secondary" onClick={() => navigate("explore")}>VOLVER AL INICIO</button>
        </div>
      </div>
      <BottomNav active="reservas" navigate={navigate} />
    </div>
  );
}
