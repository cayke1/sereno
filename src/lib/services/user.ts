const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface UploadImageResponse {
  message: string;
  url: string;
}
export const UserService = {
  async sendImage(image: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(`${API_URL}/users/upload-image`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha no upload da imagem");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
