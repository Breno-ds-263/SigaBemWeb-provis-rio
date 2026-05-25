import { useState, type ReactNode, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode, type JwtPayload } from "jwt-decode";

import toast from "react-hot-toast";
import type { LoginResponse as loginResponse, User } from "../../types/auth";

type AuthProviderProps = {
  children: ReactNode;
}

interface MyTokenPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

export function AuthProvider({ children }: AuthProviderProps ) {  

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

   const handleLogout = useCallback(() => {
    const toastID = toast.loading("Deslogando usuário")
    try {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success("Usuário deslogado!", { id: toastID })
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deslogar usuário!", { id:toastID })
      return
    }
  }, [navigate])

  useEffect(() => {
    const verifyToken = () => {
    const token = localStorage.getItem('token');

    if (!token || token === 'undefined') {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      // Decodifica o token para ler os dados (sem bater no backend)
      const decoded = jwtDecode<MyTokenPayload>(token);
      const currentTime = Date.now() / 1000; // Tempo atual em segundos

      // Verifica se o token expirou
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token expirado");
        handleLogout();
      } else {
        // O token ainda é válido localmente
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Como você não tem endpoint de dados, preenchemos o estado
        // com o que estiver dentro do próprio token (ex: nome, id)
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          autenticated: true
        });
      }
    } catch (error) {
      console.error("Token inválido ou malformado", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

    verifyToken();
  }, [handleLogout])

  const handleLogin = useCallback(async (cpf: string, password: string) => {
    const toastID = toast.loading("Fazendo Login");
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_URL, {
        cpf,
        password
      })

      const data: loginResponse = response.data;

      console.log("TOKEN RECEBIDO: ", data.token, " | URL DE BUSCA: ", import.meta.env.VITE_LOGIN_URL)

      if(!data.token) throw new Error("Token não encontrado")

      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      
      toast.success("Login realizado", { id: toastID })
      navigate('/Home');
    } catch (error) {
      toast.error("CPF ou Senha Inválidos!", { id: toastID })
      console.error(error);
      throw new Error("CPF ou Senha Inválidos!");
    } finally {
      setLoading(false);
    }
  }, [navigate]) 

 

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};