import { IconWarning, IconScooter} from "../components/Icons";
import { BottomNav } from "../components/LayoutComponents";
 
export default function UnavailableScreen({ navigate }) {
  return (
    <div className="uvm-unavailable">
      <header className="uvm-header uvm-header--has-back">
        <span className="uvm-logo-uv">UV</span>
        <span className="uvm-logo-move"> MOVE</span>
      </header>
 
      <div className="uvm-unavailable__body">
        <div className="uvm-unavailable__icon"><IconWarning /></div>
 
        <h1 className="uvm-unavailable__h1">VEHÍCULO NO DISPONIBLE</h1>
        <p className="uvm-unavailable__sub">
          El vehículo seleccionado ya no puede reservarse.
        </p>
 
        <div className="uvm-unavailable__vehicle-card">
          <div className="uvm-unavailable__vehicle-header">
            <IconScooter size={32} color="#ea580c" />
            <p className="uvm-unavailable__vehicle-name">SCOOTER #S205</p>
          </div>
          <div className="uvm-unavailable__vehicle-divider" />
          <div className="uvm-unavailable__vehicle-status">
            <span className="uvm-status-dot uvm-status-dot--red uvm-status-dot--md" />
            <span className="uvm-status-label--red">Estado actual: RESERVADO</span>
          </div>
        </div>
 
        <div className="uvm-unavailable__error-box">
          <p className="uvm-unavailable__error-title">La reserva no fue creada.</p>
          <p className="uvm-unavailable__error-body">
            Esto ocurre porque el vehículo ya no se encuentra disponible (Regla de negocio RN3).
          </p>
        </div>
 
        <div className="uvm-unavailable__actions">
          <button className="uvm-btn-primary" onClick={() => navigate("explore")}>
            VER OTROS VEHÍCULOS
          </button>
          <button className="uvm-btn-ghost" onClick={() => navigate("explore")}>
            REGRESAR
          </button>
        </div>
      </div>
 
      <BottomNav active="none" navigate={navigate} />
    </div>
  );
}
