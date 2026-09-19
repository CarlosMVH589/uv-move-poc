import { IconScooter } from "../components/Icons";
import { BackHeader, InfoRow, BottomNav } from "../components/LayoutComponents";
 
export default function ScooterDetailScreen({ navigate }) {
  return (
    <div className="uvm-detail">
      <BackHeader title="DETALLE DEL VEHÍCULO" onBack={() => navigate("explore")} />
 
      <div className="uvm-detail__body">
        <div className="uvm-detail__hero">
          <IconScooter size={80} color="#1a4fa0" />
          <h2 className="uvm-detail__hero-name">SCOOTER #S205</h2>
          <div className="uvm-detail__hero-status">
            <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--md" />
            <span className="uvm-detail__hero-status-label">DISPONIBLE</span>
          </div>
        </div>
 
        <div className="uvm-card uvm-detail__info-card">
          <InfoRow label="UBICACIÓN" value="Estación Norte" />
          <div className="uvm-card-divider" />
          <InfoRow label="TIPO" value="Scooter Eléctrico" />
          <div className="uvm-card-divider" />
          <InfoRow label="ESTADO" value="Disponible para reservar" valueClass="uvm-info-row__value--green" />
        </div>
 
        <div className="uvm-detail__divider" />
 
        <div className="uvm-detail__avail-box">
          <div className="uvm-detail__avail-row">
            <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--sm" />
            <span className="uvm-detail__avail-label">Reserva disponible</span>
          </div>
          <p className="uvm-detail__avail-note">Tiempo máximo: 10 minutos</p>
        </div>
 
        <div className="uvm-detail__cta">
          <button className="uvm-btn-primary uvm-btn-primary--lg" onClick={() => navigate("unavailable")}>
            RESERVAR AHORA
          </button>
        </div>
      </div>
 
      <BottomNav active="none" navigate={navigate} />
    </div>
  );
}
