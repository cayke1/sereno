"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "PATIENT" | "PROFESSIONAL";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Função segura para acessar localStorage (apenas no cliente)
  const getLocalStorage = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  // Função segura para definir localStorage (apenas no cliente)
  const setLocalStorage = (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  // Função segura para remover localStorage (apenas no cliente)
  const removeLocalStorage = (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a página
    const loadUserData = () => {
      try {
        const storedToken = getLocalStorage("token");
        const storedUser = getLocalStorage("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log("Usuário carregado do localStorage:", parsedUser);
          } catch (error) {
            console.error("Erro ao analisar dados do usuário:", error);
            // Limpar dados inválidos
            removeLocalStorage("token");
            removeLocalStorage("user");
          }
        } else {
          console.log("Nenhum dado de usuário encontrado no localStorage");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });

      if (response && response.token && response.user) {
        setUser(response.user);
        setToken(response.token);

        setLocalStorage("token", response.token);
        setLocalStorage("user", JSON.stringify(response.user));

        console.log("Login realizado com sucesso:", response.user);
        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        console.error("Resposta de login inválida:", response);
        toast.error("Resposta de login inválida");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Falha ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      const response = await authService.register({
        name,
        email,
        password,
      });

      if (response && response.token && response.user) {
        setUser(response.user);
        setToken(response.token);

        setLocalStorage("token", response.token);
        setLocalStorage("user", JSON.stringify(response.user));

        console.log("Registro realizado com sucesso:", response.user);
        toast.success("Registro realizado com sucesso!");
        router.push("/dashboard");
      } else {
        console.error("Resposta de registro inválida:", response);
        toast.error("Resposta de registro inválida");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error(
        "Falha ao criar conta. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeLocalStorage("token");
    removeLocalStorage("user");
    console.log("Logout realizado com sucesso");
    router.push("/auth/login");
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
