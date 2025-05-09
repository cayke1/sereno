import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, category: string) => void;
}

export function DocumentUploadModal({
  isOpen,
  onClose,
  onUpload,
}: DocumentUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const documentCategories = [
    { id: "medical", name: "Relatório Médico" },
    { id: "evaluation", name: "Avaliação Psicológica" },
    { id: "treatment", name: "Plano de Tratamento" },
    { id: "progress", name: "Relatório de Progresso" },
    { id: "personal", name: "Documentação Pessoal" },
    { id: "other", name: "Outros" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast.error("Formato não suportado");
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Nenhum arquivo selecionado");
      return;
    }

    if (!category) {
      toast.error("Categoria não selecionada");

      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      onUpload(file, category);
      setIsUploading(false);
      resetForm();
      onClose();

      toast.success("Upload realizado com sucesso");
    }, 1500);
  };

  const resetForm = () => {
    setFile(null);
    setCategory("");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Upload de Documento
          </DialogTitle>
          <DialogDescription>
            Faça upload de documentos em formato PDF relacionados ao paciente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium">
              Arquivo (PDF)
            </Label>

            <div className="mt-2 flex items-center gap-x-3">
              <label
                htmlFor="file-upload"
                className="group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-input bg-muted/30 px-6 py-8 text-center hover:bg-muted/40 transition-colors"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-mint-100 p-3">
                    <Upload className="h-6 w-6 text-mint-700" />
                  </div>
                  <div className="flex flex-col space-y-1 text-center">
                    <span className="text-sm font-medium">
                      Clique para selecionar ou arraste o arquivo
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Somente PDFs (max. 10MB)
                    </span>
                  </div>
                </div>
                {file && (
                  <div className="mt-4 flex items-center justify-center rounded-md bg-background/80 px-3 py-2 backdrop-blur">
                    <FileText className="h-4 w-4 mr-2 text-mint-700" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </span>
                  </div>
                )}
                <Input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Categoria
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || !category || isUploading}
            className="bg-mint-500 hover:bg-mint-600 text-white"
          >
            {isUploading ? "Enviando..." : "Enviar Documento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
