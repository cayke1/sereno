import { useQuery } from "@tanstack/react-query";

interface GetInviteResponse {
  id: string;
  sent_by: string;
  sent_to: string;
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  professional?: {
    id: string;
    name: string;
    email: string;
  };
}

async function getInvite(id: string): Promise<GetInviteResponse> {
  const response = await fetch(`/api/invite/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch invite");
  }

  return response.json();
}

export function useGetInvite(id: string) {
  return useQuery({
    queryKey: ["invite", id],
    queryFn: () => getInvite(id),
    enabled: !!id,
    meta: {
      errorMessage: "Failed to load invite",
    },
  });
}
