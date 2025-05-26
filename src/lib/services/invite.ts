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

  async handleAcceptInvite(inviteId: string) {
    try {
      const response = await fetch(`${API_URL}/invite/accept/${inviteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to accept invite");
      }

      return await response.json();
    } catch (error) {
      console.error("Error accepting invite:", error);
      throw new Error("Failed to accept invite. Please try again later.");
    }
  },

  async handleDeclineInvite(inviteId: string) {
    try {
      const response = await fetch(`${API_URL}/invite/reject/${inviteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to decline invite");
      }

      return await response.json();
    } catch (error) {
      console.error("Error declining invite:", error);
      throw new Error("Failed to decline invite. Please try again later.");
    }
  },
};
