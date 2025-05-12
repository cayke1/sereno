import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Document {
  id: string;
  filename: string;
  mimeType: string;
  size?: string;
  createdAt: string;
  owner?: any;
  url: string;
}

interface DocumentFolderProps {
  title: string;
  description: string;
  documents: Document[];
  showPatientColumn?: boolean;
}

export function DocumentFolder({
  title,
  description,
  documents,
  showPatientColumn = false,
}: DocumentFolderProps) {
  const handleDelete = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/document/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!response.ok) {
      toast.error("Falha ao excluir o documento");
      return;
    }

    toast.success("Documento excluído com sucesso");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum documento encontrado.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                {showPatientColumn && <TableHead>Paciente</TableHead>}
                <TableHead>Tamanho</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow
                  key={doc.id}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-mint-600" />
                      <span className="truncate max-w-[300px]">
                        {doc.filename}
                      </span>
                    </div>
                  </TableCell>
                  {showPatientColumn && doc.owner ? (
                    <TableCell>{doc.owner.name}</TableCell>
                  ) : (
                    <TableCell> </TableCell>
                  )}
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{formatDate(doc.createdAt)}</TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-2 justify-end">
                      <a
                        href={`${doc.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mint-600 hover:text-mint-800"
                        download={doc.filename}
                      >
                        Baixar
                      </a>

                      <a
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(doc.id)}
                      >
                        Excluir
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
