import { useNavigate } from "react-router-dom";
export default function Pantalla01Consulta() {
  const navigate = useNavigate();
  const vehiculos = [
    {
      id: 1,
      nombre: "Bicicleta Urbana UV-01",
      tipo: "Bicicleta",
      disponible: true,
    },
    {
      id: 2,
      nombre: "Scooter Eléctrico UV-02",
      tipo: "Scooter",
      disponible: false,
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Pantalla 01: Consulta de Vehículos</h2>
      <p>Selecciona un vehículo para ver su detalle y solicitar reserva:</p>

      {vehiculos.map((v) => (
        <div
          key={v.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{v.nombre}</h3>
          <p>Tipo: {v.tipo}</p>
          <button
            onClick={() => navigate(`/detalle`, { state: { vehiculo: v } })}
          >
            Ver Detalle
          </button>
        </div>
      ))}
    </div>
  );
}
