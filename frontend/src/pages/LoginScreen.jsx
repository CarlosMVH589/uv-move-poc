import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import "../login.css";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage("Correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.");
    }
    setIsSubmitting(false);
  }

  return (
    <main className="uvm-login">
      <section className="uvm-login__panel" aria-labelledby="login-title">
        <div className="uvm-login__brand" aria-label="UV Move">
          <span className="uvm-logo-uv">UV</span>
          <span className="uvm-logo-move"> MOVE</span>
        </div>
        <p className="uvm-login__eyebrow">MOVILIDAD UNIVERSITARIA</p>
        <h1 id="login-title">Inicia sesión para moverte</h1>
        <p className="uvm-login__intro">Usa tu cuenta institucional para consultar y reservar vehículos.</p>

        {!supabase && (
          <p className="uvm-login__error" role="alert">
            Falta configurar Supabase. Revisa las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
          </p>
        )}

        <form onSubmit={handleSubmit} className="uvm-login__form">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@uv.mx"
            autoComplete="email"
            required
            disabled={!supabase || isSubmitting}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Tu contraseña"
            autoComplete="current-password"
            required
            disabled={!supabase || isSubmitting}
          />

          {errorMessage && <p className="uvm-login__error" role="alert">{errorMessage}</p>}

          <button type="submit" className="uvm-btn-primary uvm-login__submit" disabled={!supabase || isSubmitting}>
            {isSubmitting ? "VERIFICANDO..." : "INICIAR SESIÓN"}
          </button>
        </form>
      </section>
    </main>
  );
}