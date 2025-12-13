import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/dashboard.css";

interface UserActivity {
  id: number;
  activityId: number;
  status: string;
  points?: number;
  assignedAt: string;
}

export default function Dashboard() {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    api
      .get(`/user-activities/user/${userId}`)
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="container">
        <p>Cargando panel...</p>
      </div>
    );
  }

  return (
    <div className="container dashboard">
      <h2>📊 Mi Panel de Actividades</h2>

      {activities.length === 0 ? (
        <p>No tienes actividades asignadas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Estado</th>
              <th>Puntos</th>
              <th>Asignada</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a.id}>
                <td>#{a.activityId}</td>
                <td className={`status ${a.status}`}>{a.status}</td>
                <td>{a.points ?? "-"}</td>
                <td>{new Date(a.assignedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
