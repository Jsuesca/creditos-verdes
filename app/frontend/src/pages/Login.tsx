import { useState } from "react";
import { api } from "../services/api";

interface Props {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
}

export default function Login({ onLoginSuccess, onGoToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <button type="submit">Ingresar</button>

      <button type="button" onClick={onGoToRegister}>
        Registrarse
      </button>
    </form>
  );
}
