const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const inviteService = {
  async handleSendInvite(email: string) {
    try {
      const response = await fetch(`${API_URL}/patient-professional/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ patientEmail: email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send invite");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending invite:", error);
      throw new Error("Failed to send invite. Please try again later.");
    }
  },
};
