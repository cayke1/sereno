const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface UploadDocumentRequest {
  file: File;
  category: "MODEL" | "PATIENT_UPLOAD" | "PROFESSIONAL_UPLOAD";
  owner_id?: string | null;
}

interface UploadDocumentResponse {
  id: string;
  createdAt: Date;
  category: "MODEL" | "PATIENT_UPLOAD" | "PROFESSIONAL_UPLOAD";
  url: string;
  filename: string;
  mimeType: string;
  updated_by_id: string | null;
  owner_id: string | null;
}

export const DocumentService = {
  async uploadDocument({
    file,
    category,
    owner_id,
  }: UploadDocumentRequest): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    if (owner_id) {
      formData.append("ownerId", owner_id);
    }

    try {
      const response = await fetch(`${API_URL}/document/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha no upload do documento");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
