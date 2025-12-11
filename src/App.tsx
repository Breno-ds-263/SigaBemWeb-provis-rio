import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Line from "./pages/Lines";
import Notifications from "./components/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rota padrão: redireciona "/" para "/Login" */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* Rota protegida */}
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/Lines"
          element={
            <PrivateRoute>
              <Line />
            </PrivateRoute>
          }
        />

        {/* Rota de Notificações */}
        <Route
          path="/Notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />

        {/* Rota pública */}
        <Route path="/Login" element={<Login />} />

        {/* Rota fallback para páginas inexistentes */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
