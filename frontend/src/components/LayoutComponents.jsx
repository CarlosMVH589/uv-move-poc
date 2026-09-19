import { IconArrowLeft, IconHome, IconClock, IconUser} from "./Icons";
export function BackHeader({ title, onBack }) {
  return (
    <header className="uvm-header uvm-header--has-back">
      <button className="uvm-btn-back" onClick={onBack}>
        <IconArrowLeft />
      </button>
      <h1 className="uvm-header__title">{title}</h1>
    </header>
  );
}

export function InfoRow({ label, value, valueClass = "" }) {
  return (
    <div className="uvm-info-row">
      <span className="uvm-info-row__label">{label}</span>
      <span className={`uvm-info-row__value ${valueClass}`}>{value}</span>
    </div>
  );
}
export function BottomNav({ active = "none", navigate }) {
  return (
    <nav className="uvm-bottom-nav">
      <button
        className={`uvm-bottom-nav__item ${active === "home" ? "uvm-bottom-nav__item--active" : ""}`}
        onClick={() => navigate("explore")}
      >
        <IconHome color={active === "home" ? "#1a4fa0" : "#94a3b8"} />
        <span>Inicio</span>
      </button>
      <button
        className={`uvm-bottom-nav__item ${active === "reservas" ? "uvm-bottom-nav__item--active" : ""}`}
        onClick={() => navigate("confirmed")}
      >
        <IconClock color={active === "reservas" ? "#1a4fa0" : "#94a3b8"} />
        <span>Mis Reservas</span>
      </button>
      <button
      className={`uvm-bottom-nav__item ${active === "perfil" ? "uvm-bottom-nav__item--active" : ""}`}
      onClick={() => navigate("explore")}
        >
            <IconUser size={22} color={active === "perfil" ? "#1a4fa0" : "#94a3b8"} />
            <span>Perfil</span>
            </button>
            </nav>
  );
}
