import { useEffect, useState } from "react";
import { api } from "../services/api";

interface CatalogItem {
  id: number;
  clave: string;
  nombre: string;
  descripcion: string;
}

export default function Catalog() {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/activities/catalog")
      .then(res => {
        setCatalog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("No se pudo cargar el catálogo");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>📋 Catálogo de Actividades</h2>

      {catalog.length === 0 ? (
        <p>No hay actividades disponibles</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {catalog.map(item => (
            <div key={item.id} className="card">
              <h3>{item.nombre}</h3>

              <p style={{ color: "#555" }}>
                {item.descripcion}
              </p>

              <small style={{ color: "#888" }}>
                Código: <strong>{item.clave}</strong>
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
