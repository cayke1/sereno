import { useEffect, useState } from "react";
import { GetModelsResponse } from "./useGetModels";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
async function getMy(token: string): Promise<GetModelsResponse[]> {
  const url = `${API_URL}/document/my`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch models");
  return response.json();
}

export function useGetMy() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return useQuery({
    queryKey: ["my"],
    queryFn: () => getMy(token!),
    enabled: !!token,
    meta: {
      errorMessage: "Falha ao carregar documentos",
    },
  });
}