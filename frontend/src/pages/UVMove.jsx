import { useState } from "react";
import ExploreScreen from "./ExploreScreen";
import DetailScreen from "./DetailScreen";
import ScooterDetailScreen from "./ScooterDetailScreen";
import ConfirmedScreen from "./ConfirmedScreen";
import UnavailableScreen from "./UnavailableScreen";
import "../uvmove.css";
 
export default function UVMove() {
  const [screen, setScreen] = useState("explore");
 
  const screenLabel = {
    explore: "01 – Explorar vehículos",
    detail: "02 – Detalle y reservar (Bicicleta)",
    "detail-scooter": "02 – Detalle y reservar (Scooter)",
    confirmed: "03 – Reserva confirmada (Escenario 1)",
    unavailable: "04 – Vehículo no disponible (Escenario 2)",
  };
 
  return (
    <div className="uvm-shell">
      <div className="uvm-phone">
        {/* Barra de estado móvil */}
        <div className="uvm-statusbar">
          <span className="uvm-statusbar__time">9:41</span>
          <div className="uvm-statusbar__right">
            <span>●●●</span>
            <span className="uvm-statusbar__battery">100%</span>
          </div>
        </div>
 
        {/* Vistas navegables */}
        <div className="uvm-screen-wrap">
          {screen === "explore" && <ExploreScreen navigate={setScreen} />}
          {screen === "detail" && <DetailScreen navigate={setScreen} />}
          {screen === "detail-scooter" && <ScooterDetailScreen navigate={setScreen} />}
          {screen === "confirmed" && <ConfirmedScreen navigate={setScreen} />}
          {screen === "unavailable" && <UnavailableScreen navigate={setScreen} />}
        </div>
      </div>
 
      <div className="uvm-badge">{screenLabel[screen]}</div>
    </div>
  );
}
