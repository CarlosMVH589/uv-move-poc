import { IconCheck, IconBike, IconPin } from "../components/Icons";
import { BottomNav } from "../components/LayoutComponents";
 
export default function ConfirmedScreen({ navigate }) {
  const circumference = 2 * Math.PI * 24;
 
  return (
    <div className="uvm-confirmed">
      <header className="uvm-header uvm-header--center">
        <span className="uvm-logo-uv">UV</span>
        <span className="uvm-logo-move"> MOVE</span>
      </header>
 
      <div className="uvm-confirmed__body">
        <div className="uvm-confirmed__icon"><IconCheck /></div>
 
        <h1 className="uvm-confirmed__h1">¡RESERVA CONFIRMADA!</h1>
        <p className="uvm-confirmed__sub">Tu vehículo está reservado</p>
 
        <div className="uvm-card uvm-confirmed__res-card">
          <div className="uvm-confirmed__res-card-header">
            <IconBike size={32} color="#1a4fa0" />
            <p className="uvm-confirmed__res-card-name">BICICLETA #B102</p>
          </div>
          <div className="uvm-card-divider" />
          <div className="uvm-confirmed__res-card-row">
            <IconPin size={14} color="#64748b" />
            <span className="uvm-confirmed__res-card-loc">Estación Central</span>
          </div>
          <div className="uvm-card-divider" />
          <div className="uvm-confirmed__res-card-row">
            <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--md" />
            <span className="uvm-status-label--green" style={{ fontSize: 14 }}>RESERVA ACTIVA</span>
          </div>
          <div className="uvm-card-divider" />
          <div className="uvm-confirmed__res-id-wrap">
            <p className="uvm-confirmed__res-id-label">Reserva</p>
            <p className="uvm-confirmed__res-id-value">#R0254</p>
          </div>
        </div>
 
        <div className="uvm-timer-card">
          <p className="uvm-timer-card__label">Tiempo para iniciar</p>
          <div className="uvm-timer-card__row">
            <div className="uvm-timer-card__ring-wrap">
              <svg viewBox="0 0 56 56" className="uvm-timer-card__ring">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="24"
                  fill="none" stroke="#16a34a" strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * 0.05}
                  strokeLinecap="round"
                />
              </svg>
              <span className="uvm-timer-card__ring-pct">95%</span>
            </div>
            <div>
              <p className="uvm-timer-card__time">10:00</p>
              <p className="uvm-timer-card__note">minutos restantes</p>
            </div>
          </div>
        </div>
 
        <div className="uvm-confirmed__actions">
          <button className="uvm-btn-secondary" onClick={() => navigate("explore")}>VER MI RESERVA</button>
          <button className="uvm-btn-primary" onClick={() => navigate("explore")}>VOLVER AL INICIO</button>
        </div>
      </div>
 
      <BottomNav active="reservas" navigate={navigate} />
    </div>
  );
}
