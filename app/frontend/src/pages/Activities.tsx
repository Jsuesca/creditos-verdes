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

  if (loading) return <p>Cargando actividades...</p>;

  return (
    <div className="container">
      <h2>Actividades disponibles</h2>

      {activities.length === 0 && <p>No hay actividades</p>}

      {activities.map(act => (
        <div key={act.id} className="card">
          <h3>{act.title}</h3>
          <p>{act.description}</p>
          <p><strong>Puntos:</strong> {act.basePoints}</p>
          <p><strong>Nivel:</strong> {act.level}</p>

          <button>Subir evidencia</button>
        </div>
      ))}
    </div>
  );
}
