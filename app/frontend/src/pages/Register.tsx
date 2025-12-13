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
        status: "active", // 🔥 requerido por el backend
      });

      alert("Usuario registrado correctamente");
      onBackToLogin(); // vuelve al login
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
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <small>
        La contraseña debe contener letras y números
      </small>

      <br /><br />

      <button type="submit">Registrar</button>

      <button type="button" onClick={onBackToLogin}>
        Volver al login
      </button>
    </form>
  );
}
