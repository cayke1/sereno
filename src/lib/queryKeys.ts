export const queryKeys = {
  user: {
    all: ["user"],
    lists: () => [...queryKeys.user.all, "list"] as const,
    list: () => [...queryKeys.user.lists(), "list"] as const,
    details: () => [...queryKeys.user.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.user.details(), id] as const,
  },
  feelings: {
    all: ["feelings"],
  },
  document: {
    my: ["document", "my"],
    patients: ["document", "patients"],
    models: ["document", "models"],
  },
};
