import { queryKeys } from "@/lib/queryKeys";
import { DocumentType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface GetModelsResponse {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  createdAt: string;
  owner_id: string;
  isPublic: boolean;
  type: DocumentType;
  uploaded_by_id?: string;
  category?: string;
}

async function getModels(
  token: string,
  category?: string
): Promise<GetModelsResponse[]> {
  const url = `${API_URL}/document/models${
    category != undefined ? `?category=${category}` : ""
  }`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch models");
  return response.json();
}

export function useGetModels(category?: string) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return useQuery({
    queryKey: [queryKeys.document.models, category],
    queryFn: () => getModels(token!, category),
    enabled: !!token,
    meta: {
      errorMessage: "Falha ao carregar modelos",
    },
  });
}
