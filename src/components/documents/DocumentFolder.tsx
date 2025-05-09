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

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: string;
  patient?: string;
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
                      <span className="truncate max-w-[300px]">{doc.name}</span>
                    </div>
                  </TableCell>
                  {showPatientColumn && <TableCell>{doc.patient}</TableCell>}
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
