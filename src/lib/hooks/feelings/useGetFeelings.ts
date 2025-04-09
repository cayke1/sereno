import { emotion } from "@/@types/feelings";
import { useQuery } from "@tanstack/react-query";

interface ResponseGetAllFeelings {
  feelings: {
    id: string;
    emotion: emotion;
    description?: string;
    createdAt: string;
    updatedAt: string;
    intensity: number;
    userId: string;
    trigger?: string;
  }[];
}

async function getAllFeelings(userId: string): Promise<ResponseGetAllFeelings> {
  const request = await fetch(`/api/feelings/getAll/${userId}`, {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to fetch feelings");
  }
  return request.json();
}

export function useGetFeelings(userId: string) {
  return useQuery({
    queryKey: ["feelings", userId],
    queryFn: () => getAllFeelings(userId),
    enabled: !!userId,
    meta: {
      errorMessage: "Falha ao carregar sentimentos",
    },
  });
}
