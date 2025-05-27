import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: "PATIENT" | "PROFESSIONAL";
}

interface RegisterPatientCredentials extends RegisterCredentials {
  professional_id: string;
  invite_id: string;
}
export interface AuthResponse {
  access_token: string;

  id: string;
  name: string;
  email: string;
  role: "PATIENT" | "PROFESSIONAL";
  imageUrl?: string;
  plan?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha na autenticação");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro durante o login");
      }
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha no registro");
      }

      return await response.json();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro durante o registro");
      }
      throw error;
    }
  },

  async registerPatient(
    credentials: RegisterPatientCredentials
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha no registro do paciente");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro durante o registro do paciente");
      }
      throw error;
    }
  },

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Falha ao enviar email de recuperação"
        );
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async resetPassword(token: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha ao redefinir senha");
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
