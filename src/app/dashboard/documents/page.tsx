"use client"
import React, { useState } from "react";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DocumentFolder } from "@/components/documents/DocumentFolder";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { Folder, FolderOpen, Search, Upload, File } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

// Sample data - in a real app this would come from an API
const modelDocuments = [
  {
    id: "1",
    name: "Formulário de Avaliação Inicial.pdf",
    type: "pdf",
    size: "245 KB",
    updatedAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Contrato de Serviço.pdf",
    type: "pdf",
    size: "198 KB",
    updatedAt: "2025-02-03",
  },
  {
    id: "3",
    name: "Relatório de Progresso.pdf",
    type: "pdf",
    size: "312 KB",
    updatedAt: "2025-03-20",
  },
  {
    id: "4",
    name: "Questionário de Satisfação.pdf",
    type: "pdf",
    size: "175 KB",
    updatedAt: "2025-04-12",
  },
];

const patientDocuments = [
  {
    id: "1",
    name: "Histórico Médico - João Silva.pdf",
    type: "pdf",
    size: "1.2 MB",
    updatedAt: "2025-04-05",
    patient: "João Silva",
  },
  {
    id: "2",
    name: "Avaliação Psicológica - Maria Santos.pdf",
    type: "pdf",
    size: "780 KB",
    updatedAt: "2025-03-22",
    patient: "Maria Santos",
  },
  {
    id: "3",
    name: "Plano de Tratamento - Carlos Oliveira.pdf",
    type: "pdf",
    size: "420 KB",
    updatedAt: "2025-02-18",
    patient: "Carlos Oliveira",
  },
  {
    id: "4",
    name: "Relatório Médico - Ana Lima.pdf",
    type: "pdf",
    size: "650 KB",
    updatedAt: "2025-04-01",
    patient: "Ana Lima",
  },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState("models");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUpload = (file: File, category: string) => {
    console.log("Document uploaded:", file.name, "Category:", category);
    // In a real app, this would make an API call to save the document
  };

  // Filter documents based on search query
  const filteredModelDocs = modelDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPatientDocs = patientDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.patient?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-grow py-10 px-4 md:px-6 bg-slate-50">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-heading mb-2">
              Documentos
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus modelos de documentos e documentos de pacientes.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with folders */}
            <div className="w-full lg:w-64 space-y-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Pastas</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <nav className="space-y-1">
                    <Button
                      variant={activeFolder === "models" ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${activeFolder === "models" ? "bg-mint-500 hover:bg-mint-600 text-white" : ""}`}
                      onClick={() => setActiveFolder("models")}
                    >
                      {activeFolder === "models" ? (
                        <FolderOpen size={18} />
                      ) : (
                        <Folder size={18} />
                      )}
                      Modelos
                    </Button>
                    <Button
                      variant={
                        activeFolder === "patients" ? "default" : "ghost"
                      }
                      className={`w-full justify-start gap-3 ${activeFolder === "patients" ? "bg-mint-500 hover:bg-mint-600 text-white" : ""}`}
                      onClick={() => setActiveFolder("patients")}
                    >
                      {activeFolder === "patients" ? (
                        <FolderOpen size={18} />
                      ) : (
                        <Folder size={18} />
                      )}
                      Pacientes
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              <Button
                className="w-full bg-mint-500 hover:bg-mint-600 text-white"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Upload className="mr-2" size={18} />
                Enviar Documento
              </Button>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <Card className="mb-6">
                <CardContent className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar documentos..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <Button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="bg-mint-500 hover:bg-mint-600 text-white"
                    >
                      <Upload className="mr-2" size={18} />
                      Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Display appropriate folder content */}
              {activeFolder === "models" ? (
                <DocumentFolder
                  title="Modelos"
                  description="Documentos modelos para uso com pacientes"
                  documents={filteredModelDocs}
                />
              ) : (
                <DocumentFolder
                  title="Pacientes"
                  description="Documentos enviados por ou para pacientes"
                  documents={filteredPatientDocs}
                  showPatientColumn
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      <Footer />
    </div>
  );
}
