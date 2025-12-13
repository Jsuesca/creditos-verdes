import { useState } from "react";
import { api } from "../services/api";

interface Props {
  onBackToLogin: () => void;
}

export default function Register({ onBackToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/users/users", {
        name,
        email,
        password,
        status: "active", // requerido por el backend
      });

      alert("Usuario registrado correctamente");
      onBackToLogin();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.details ||
        err?.response?.data?.error ||
        "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Registro</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <small style={{ display: "block", marginBottom: "1rem", color: "#555" }}>
          La contraseña debe contener letras y números
        </small>

        <button className="btn-primary" type="submit">
          Registrar
        </button>

        <button
          className="btn-secondary"
          type="button"
          onClick={onBackToLogin}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}
