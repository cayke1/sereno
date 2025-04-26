import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ResponseGetAllPatients {
  id: string;
  professionalId: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "PATIENT";
    createdAt: string;
    updatedAt: string;
    licenseNumber: null;
    stripeCustomerId: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getAllPatients(
  token: string
): Promise<ResponseGetAllPatients[]> {
  const response = await fetch(`${API_URL}/professional-reports/patients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
}

export function useGetPatients() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return useQuery({
    queryKey: ["patients"],
    queryFn: () => getAllPatients(token!),
    enabled: !!token,
    meta: {
      errorMessage: "Falha ao carregar pacientes",
    },
  });
}
