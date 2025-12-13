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

  if (loading) return <p>Cargando catálogo...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>📋 Catálogo de Actividades</h2>

      {catalog.length === 0 ? (
        <p>No hay actividades disponibles</p>
      ) : (
        <ul>
          {catalog.map(item => (
            <li key={item.id} style={{ marginBottom: "1rem" }}>
              <strong>{item.nombre}</strong>
              <p>{item.descripcion}</p>
              <small>Código: {item.clave}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
