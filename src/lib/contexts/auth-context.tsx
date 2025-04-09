"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse, authService } from "../services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "PATIENT" | "PROFESSIONAL";
  professional_id?: string;
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
    role: "PATIENT" | "PROFESSIONAL"
  ) => Promise<void>;
  logout: () => void;
  registerPatient: (
    name: string,
    email: string,
    password: string,
    professional_id: string
  ) => Promise<void>;
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
        const storedToken = getLocalStorage("access_token");
        const storedUser = getLocalStorage("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (error) {
            console.error("Erro ao analisar os dados do usuário:", error);
            removeLocalStorage("access_token");
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

  const afterLogin = (response: AuthResponse) => {
    try {
      if (response && response.access_token && response.id) {
        setUser({
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role,
        });
        setToken(response.access_token);

        setLocalStorage("access_token", response.access_token);
        document.cookie = `access_token=${response.access_token}; path=/; max-age=86400; secure;`;
        document.cookie = `user_role=${response.role}; path=/; max-age=86400; secure;`;
        document.cookie = `user_id=${response.id}; path=/; max-age=86400; secure;`;
        setLocalStorage(
          "user",
          JSON.stringify({
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
          })
        );

        toast.success("Usuário logado com sucesso!");
        if (user && user.role === "PROFESSIONAL") {
          router.push("/dashboard/select-plan");
        } else if (user && user.role === "PATIENT") {
          router.push("/patient/portal");
        }
      } else {
        toast.error("Resposta de registro inválida");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });

      afterLogin(response);
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
    role: "PATIENT" | "PROFESSIONAL"
  ) => {
    try {
      setIsLoading(true);
      const response = await authService.register({
        name,
        email,
        password,
        role,
      });

      afterLogin(response);
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error(
        "Falha ao criar conta. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const registerPatient = async (
    name: string,
    email: string,
    password: string,
    professional_id: string
  ) => {
    try {
      setIsLoading(true);
      const response = await authService.registerPatient({
        name,
        email,
        password,
        professional_id,
        role: "PATIENT",
      });

      afterLogin(response);
    } catch (error) {
      console.error(error);
      toast.error(
        "Falha ao criar conta. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeCookies = () => {
    document.cookie =
      "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure;";
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure;";
    document.cookie =
      "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure;";
  };

  const logout = () => {
    removeCookies();
    setUser(null);
    setToken(null);
    removeLocalStorage("access_token");
    removeLocalStorage("user");
    removeLocalStorage("token");
    console.log("Logout realizado com sucesso");
    router.push("/auth/login");
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        registerPatient,
      }}
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
