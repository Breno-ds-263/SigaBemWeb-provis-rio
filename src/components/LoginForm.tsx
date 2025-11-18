import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  cpf: string;
  password: string;
}

export default function LoginForm() {
  const [user, setUser] = useState<User>({ cpf: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/Home");
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://labgeo3.recife.ifpe.edu.br/sigabem/api/login",
        {
          cpf: user.cpf,
          password: user.password,
        }
      );

      const token = response.data.token || response.data;
      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");
      navigate("/Home"); // 🔹 redireciona via React Router
    } catch (err) {
      console.error(err);
      setError("CPF ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-80"
    >
      <h2 className="text-center text-xl font-bold">Entrar</h2>

      <input
        type="text"
        placeholder="Usuário (CPF)"
        value={user.cpf}
        onChange={(e) => setUser({ ...user, cpf: e.target.value })}
        className="border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Senha"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border p-2 rounded"
        required
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
