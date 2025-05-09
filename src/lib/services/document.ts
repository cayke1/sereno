import { DocumentType } from "@prisma/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface UploadDocumentRequest {
  file: File;
  type: DocumentType;
  owner_id?: string | null;
  category?: string;
  isPublic?: boolean;
}

interface UploadDocumentResponse {
  id: string;
  createdAt: Date;
  type: DocumentType;
  url: string;
  filename: string;
  mimeType: string;
  updated_by_id: string | null;
  owner_id: string | null;
}

export const DocumentService = {
  async uploadDocument({
    file,
    type,
    owner_id,
    category,
    isPublic,
  }: UploadDocumentRequest): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    if (category) formData.append("category", category);
    if (isPublic) formData.append("isPublic", String(isPublic));
    if (owner_id) formData.append("ownerId", owner_id);

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
