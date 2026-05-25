import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface User {
  cpf: string;
  password: string;
}

export default function LoginForm() {
  const [user, setUser] = useState<User>({ cpf: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleLogin: login } = useAuth();

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
      await login(user.cpf, user.password);
    } catch (err) {
      console.error(err);
      if(err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao fazer login.");
      }
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
        className="bg-brand-green text-white p-2 rounded hover:bg-brand-dark-green transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
