import { CreateFeelingDto } from "@/@types/feelings";

export const feelingService = {
  async createFeeling(data: CreateFeelingDto) {
    try {
      const response = await fetch("/api/feelings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create feeling");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating feeling:", error);
      throw new Error("Failed to create feeling");
    }
  },
};
