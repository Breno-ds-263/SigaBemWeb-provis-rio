import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Line from "../pages/Lines";
import Notifications from "../pages/Notifications";
// import PrivateRoute from "../features/auth/components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota padrão: redireciona "/" para "/Login" */}
      <Route path="/" element={<Navigate to="/Login" replace />} />

      {/* Rota protegida */}
      <Route
        path="/Home"
        element={
          // <PrivateRoute>
            <Home />
          // </PrivateRoute>
        }
      />

      <Route
        path="/Lines"
        element={
          // <PrivateRoute>
            <Line />
          // </PrivateRoute>
        }
      />

      {/* Rota de Notificações */}
      <Route
        path="/Notifications"
        element={
          // <PrivateRoute>
            <Notifications />
          // </PrivateRoute>
        }
      />

      {/* Rota pública */}
      <Route path="/Login" element={<Login />} />

      {/* Rota fallback para páginas inexistentes */}
      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}
