import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

interface ResponseUserProfile {
  id: string;
  name: string;
  email: string;
  role: "PATIENT" | "PROFESSIONAL";
  createdAt: string;
  updatedAt: string;
}
async function getUserProfile(data: {
  id: string;
}): Promise<ResponseUserProfile> {
  const request = await fetch(`${API_URL}/users/${data.id}`, {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return request.json();
}

export function useGetUser(id: string) {
  return useQuery({
    queryKey: [queryKeys.user.detail, id],
    queryFn: () => getUserProfile({ id }),
    enabled: !!id,
    meta: {
      errorMessage: "Falha ao carregar usuário",
    },
  });
}
