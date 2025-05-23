import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface unlinkPatientResponse {
  message: string;
}

export const professionalPatientService = {
  async unlinkPatient(patientEmail: string): Promise<unlinkPatientResponse> {
    try {
      const response = await fetch(`${API_URL}/patient-professional/unlink`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(patientEmail),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha ao remover paciente");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao remover o paciente");
      }
      throw error;
    }
  },
};
