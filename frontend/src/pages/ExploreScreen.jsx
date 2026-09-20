import { useEffect, useState } from "react";
import { IconUser, IconSearch, IconBike, IconScooter, IconPin } from "../components/Icons";
import { BottomNav } from "../components/LayoutComponents";
import { supabase } from "../services/supabaseClient";
import { getAvailableVehicles } from "../services/uvMoveApi";

function VehicleIcon({ type, size = 40 }) {
  return type.toLowerCase().includes("scooter")
    ? <IconScooter size={size} color="#1a4fa0" />
    : <IconBike size={size} color="#1a4fa0" />;
}

function isAvailable(vehicle) {
  return vehicle.estado_operativo.toUpperCase() === "DISPONIBLE";
}

export default function ExploreScreen({ navigate, onSelectVehicle }) {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAvailableVehicles()
      .then(setVehicles)
      .catch(() => setErrorMessage("No se pudo cargar el catálogo de vehículos."))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSignOut() {
    await supabase?.auth.signOut();
  }

  return (
    <div className="uvm-explore">
      <header className="uvm-header">
        <div className="uvm-logo-wrap">
          <span className="uvm-logo-uv">UV</span>
          <span className="uvm-logo-move"> MOVE</span>
        </div>
        <button
          className="uvm-user-icon"
          type="button"
          onClick={handleSignOut}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <IconUser size={20} color="#1a4fa0" />
        </button>
      </header>

      <div className="uvm-explore__content">
        <div className="uvm-explore__titles">
          <h1 className="uvm-explore__h1">¿A dónde vas hoy?</h1>
          <p className="uvm-explore__subtitle">Encuentra un vehículo cerca de ti</p>
        </div>

        <div className="uvm-search">
          <IconSearch />
          <span className="uvm-search__placeholder">Vehículos disponibles</span>
        </div>

        <p className="uvm-section-label">VEHÍCULOS CERCA</p>

        {errorMessage && <p className="uvm-api-error">{errorMessage}</p>}
        {isLoading && <p className="uvm-api-state">Cargando vehículos...</p>}
        {!isLoading && !errorMessage && vehicles.length === 0 && <p className="uvm-api-state">No hay vehículos registrados.</p>}
        <div className="uvm-cards-list">
          {vehicles.map((vehicle) => (
            <div className="uvm-vehicle-card" key={vehicle.id_vehiculo}>
              <div className="uvm-vehicle-card__top">
                <div className="uvm-vehicle-card__icon-wrap">
                  <VehicleIcon type={vehicle.tipo} />
                </div>
                <div className="uvm-vehicle-card__info">
                  <p className="uvm-vehicle-card__name">{vehicle.tipo} · {vehicle.id_vehiculo}</p>
                  <div className="uvm-vehicle-card__status-row">
                    <span className={`uvm-status-dot ${isAvailable(vehicle) ? "uvm-status-dot--green" : "uvm-status-dot--orange"} uvm-status-dot--sm`} />
                    <span className={isAvailable(vehicle) ? "uvm-status-label--green" : "uvm-status-label--orange"}>{vehicle.estado_operativo}</span>
                  </div>
                  <div className="uvm-vehicle-card__location">
                    <IconPin size={13} color="#64748b" />
                    <span>Batería: {vehicle.nivel_bateria}%</span>
                  </div>
                </div>
              </div>
              <button
                className="uvm-btn-primary uvm-btn-primary--card"
                onClick={() => onSelectVehicle(vehicle)}
              >
                VER DETALLE
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}
