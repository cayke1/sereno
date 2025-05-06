import { toast } from "sonner";

interface CreateSessionDto {
  professionalPatientId: string;
  startDate: string;
  endDate: string;
}

interface CreateSessionResponse {
  id: number;
  professionalPatientId: string;
  done: boolean;
  confirmed: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const therapySessionService = {
  async create(data: CreateSessionDto): Promise<CreateSessionResponse> {
    try {
      const response = await fetch(`${API_URL}/therapy-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha ao registrar sessão");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao registrar sessão");
      }
      throw error;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/therapy-session/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha ao deletar sessão");
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao deletar a sessão");
      }
      return false;
    }
  },
};
