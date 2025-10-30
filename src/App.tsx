import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'

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

        {/* Rota pública */}
        <Route path="/Login" element={<Login />} />

        {/* Rota fallback para páginas inexistentes */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
