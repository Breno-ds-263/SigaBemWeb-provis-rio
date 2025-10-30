import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  interface User {
    cpf: string;
    password: string;
  }

  const [user, setUser] = useState<User>({ cpf: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        cpf: user.cpf,
        password: user.password,
      });

      const token = response.data.token || response.data;
      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");
      window.location.href = "/Home"; // redireciona após login
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
