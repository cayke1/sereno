import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface GetPatientResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  avatar: string;
  startDate: string;
  lastSession: string;
  nextSession: string;
  emotionScore: number;
  status: "active" | "inactive" | "archived";
  diagnoses: string[];
  goals: string[];
  relationId: string;
}

async function getPatient(
  token: string,
  patient_id: string
): Promise<GetPatientResponse> {
  const response = await fetch(
    `${API_URL}/professional-reports/patient/${patient_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch patient");
  return response.json();
}

export function useGetPatient(patient_id: string) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return useQuery({
    queryKey: ["patient", patient_id],
    queryFn: () => getPatient(token!, patient_id),
    enabled: !!token || !!patient_id,
    meta: {
      errorMessage: "Falha ao carregar paciente",
    },
  });
}
