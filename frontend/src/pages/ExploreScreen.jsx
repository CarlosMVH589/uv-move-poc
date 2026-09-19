import { IconUser, IconSearch, IconBike, IconScooter, IconPin } from "../components/Icons";
import { BottomNav } from "../components/LayoutComponents";
 
export default function ExploreScreen({ navigate }) {
  return (
    <div className="uvm-explore">
      <header className="uvm-header">
        <div className="uvm-logo-wrap">
          <span className="uvm-logo-uv">UV</span>
          <span className="uvm-logo-move"> MOVE</span>
        </div>
        <div className="uvm-user-icon">
          <IconUser size={20} color="#1a4fa0" />
        </div>
      </header>
 
      <div className="uvm-explore__titles">
        <h1 className="uvm-explore__h1">¿A dónde vas hoy?</h1>
        <p className="uvm-explore__subtitle">Encuentra un vehículo cerca de ti</p>
      </div>
 
      <div className="uvm-search">
        <IconSearch />
        <span className="uvm-search__placeholder">Buscar vehículo...</span>
      </div>
 
      <p className="uvm-section-label">Vehículos cerca</p>
 
      <div className="uvm-cards-list">
        {/* Bicicleta #B102 — Flujo Exitoso */}
        <div className="uvm-vehicle-card">
          <div className="uvm-vehicle-card__top">
            <div className="uvm-vehicle-card__icon-wrap">
              <IconBike size={40} color="#1a4fa0" />
            </div>
            <div className="uvm-vehicle-card__info">
              <p className="uvm-vehicle-card__name">BICICLETA #B102</p>
              <div className="uvm-vehicle-card__status-row">
                <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--sm" />
                <span className="uvm-status-label--green">DISPONIBLE</span>
              </div>
              <div className="uvm-vehicle-card__location">
                <IconPin size={13} color="#64748b" />
                <span>Estación Central</span>
              </div>
            </div>
          </div>
          <button
            className="uvm-btn-primary uvm-btn-primary--card"
            style={{ marginTop: 16 }}
            onClick={() => navigate("detail")}
          >
            VER DETALLE
          </button>
        </div>
 
        {/* Scooter #S205 — Flujo Rechazo */}
        <div className="uvm-vehicle-card">
          <div className="uvm-vehicle-card__top">
            <div className="uvm-vehicle-card__icon-wrap">
              <IconScooter size={40} color="#1a4fa0" />
            </div>
            <div className="uvm-vehicle-card__info">
              <p className="uvm-vehicle-card__name">SCOOTER #S205</p>
              <div className="uvm-vehicle-card__status-row">
                <span className="uvm-status-dot uvm-status-dot--green uvm-status-dot--sm" />
                <span className="uvm-status-label--green">DISPONIBLE</span>
              </div>
              <div className="uvm-vehicle-card__location">
                <IconPin size={13} color="#64748b" />
                <span>Estación Norte</span>
              </div>
            </div>
          </div>
          <button
            className="uvm-btn-primary uvm-btn-primary--card"
            style={{ marginTop: 16 }}
            onClick={() => navigate("detail-scooter")}
          >
            VER DETALLE
          </button>
        </div>
      </div>
 
      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}
