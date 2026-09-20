import { useState } from "react";
import ExploreScreen from "./ExploreScreen";
import DetailScreen from "./DetailScreen";
import ConfirmedScreen from "./ConfirmedScreen";
import UnavailableScreen from "./UnavailableScreen";
import "../uvMove.css";
 
export default function UVMove({ session }) {
  const [screen, setScreen] = useState("explore");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [reservation, setReservation] = useState(null);
 
  const screenLabel = {
    explore: "01 – Explorar vehículos",
    detail: "02 – Detalle y reservar",
    confirmed: "03 – Reserva confirmada",
    unavailable: "04 – Vehículo no disponible",
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
          {screen === "explore" && (
            <ExploreScreen
              navigate={setScreen}
              onSelectVehicle={(vehicle) => {
                setSelectedVehicle(vehicle);
                setScreen("detail");
              }}
            />
          )}
          {screen === "detail" && (
            <DetailScreen
              navigate={setScreen}
              vehicle={selectedVehicle}
              userId={session.user.id}
              onReserved={(createdReservation) => {
                setReservation(createdReservation);
                setScreen("confirmed");
              }}
            />
          )}
          {screen === "confirmed" && <ConfirmedScreen navigate={setScreen} vehicle={selectedVehicle} reservation={reservation} />}
          {screen === "unavailable" && <UnavailableScreen navigate={setScreen} vehicle={selectedVehicle} />}
        </div>
      </div>
 
      <div className="uvm-badge">{screenLabel[screen]}</div>
    </div>
  );
}
