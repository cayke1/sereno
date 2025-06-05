import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

interface ResponseGetSessions {
  id: number;
  startDate: string;
  endDate: string;
  done: boolean;
  confirmed: boolean;
  professionalPatient: {
    patient: {
      name: string;
    };
  };
}

async function getSessions(token: string): Promise<ResponseGetSessions[]> {
  const request = await fetch(`${API_URL}/therapy-session`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!request.ok) {
    throw new Error("Failed to fetch therapy sessions");
  }
  return request.json();
}

export function useGetSessions() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  });
  return useQuery({
    queryKey: ["therapy-sessions"],
    queryFn: () => getSessions(token!),
    enabled: !!token,
    meta: {
      errorMessage: "Falha ao carregar sessões de terapia",
    },
  });
}
