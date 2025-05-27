import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface CheckoutResponse {
  checkout_url: string;
}
export const subscriptionService = {
  async checkout(plan: "basic" | "unlimited"): Promise<CheckoutResponse> {
    try {
      const response = await fetch(`${API_URL}/subscription/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha na autenticação");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro durante o login");
      }
      throw error;
    }
  },

  async cancel(professional_id: string): Promise<boolean> {
    try {
      const req = await fetch(
        `${API_URL}/subscription/cancel/${professional_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!req.ok) {
        throw new Error("Failed to cancel subscription");
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
