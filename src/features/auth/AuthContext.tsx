import { createContext, useContext } from "react";
import type { User } from "../../types/auth";

export type DefaultAuthContext = {
  user: User | null;
  loading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<DefaultAuthContext | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
