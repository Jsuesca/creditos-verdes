import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Activity {
  id: number;
  title: string;
  description?: string;
  basePoints: number;
  level: string;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/activities")
      .then(res => setActivities(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Cargando actividades...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Actividades disponibles</h2>

      {activities.length === 0 && (
        <p>No hay actividades disponibles</p>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {activities.map(act => (
          <div key={act.id} className="card">
            <h3>{act.title}</h3>

            {act.description && (
              <p style={{ color: "#555" }}>{act.description}</p>
            )}

            <p>
              <strong>Puntos:</strong> {act.basePoints}
            </p>

            <p>
              <strong>Nivel:</strong> {act.level}
            </p>

            <button className="btn-primary">
              Subir evidencia
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
