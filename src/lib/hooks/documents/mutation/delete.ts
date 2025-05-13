import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const deleteDocument = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/document/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o item");
  }

  return response.json();
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.document.models,
          queryKeys.document.my,
          queryKeys.document.patients,
        ],
      });
    },
  });
};
