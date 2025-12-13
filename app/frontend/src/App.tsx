import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Activities from "./pages/Activities";
import Catalog from "./pages/Catalog";

type View = "login" | "register" | "activities";

function App() {
  const [view, setView] = useState<View>("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setView("activities");
  }, []);

  return (
    <div>
      {view === "login" && (
        <Login
          onLoginSuccess={() => setView("activities")}
          onGoToRegister={() => setView("register")}
        />
      )}

      {view === "register" && (
        <Register onBackToLogin={() => setView("login")} />
      )}

      {view === "activities" && (
        <>
          <Catalog />
          <hr />
          <Activities />
        </>
      )}
    </div>
  );
}

export default App;
