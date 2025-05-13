"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DocumentFolder } from "@/components/documents/DocumentFolder";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { Folder, FolderOpen, Search, Upload, File } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import {
  GetModelsResponse,
  useGetModels,
} from "@/lib/hooks/documents/useGetModels";
import { useGetFromPatient } from "@/lib/hooks/documents/useGetFromPatient";
import { useGetMy } from "@/lib/hooks/documents/useGetMy";

export default function DocumentsPage() {
  const {
    data,
    isLoading: isLoadingModels,
  } = useGetModels();
  const {
    data: patientDocumentsRes,
    isLoading: isLoadingPatientDocuments,
  } = useGetFromPatient();
  const {
    data: myDocumentsRes,
    isLoading: isLoadingMyDocuments,
  } = useGetMy();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState("models");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modelDocuments, setModelDocuments] = useState<GetModelsResponse[]>([]);
  const [patientDocuments, setPatientDocuments] = useState<GetModelsResponse[]>(
    []
  );
  const [myDocs, setMyDocs] = useState<GetModelsResponse[]>(modelDocuments);

  useEffect(() => {
    if (!isLoadingModels) {
      if (data !== undefined) {
        setModelDocuments(data);
      }
    }

    if (!isLoadingPatientDocuments) {
      if (patientDocumentsRes !== undefined) {
        setPatientDocuments(patientDocumentsRes);
      }
    }

    if (!isLoadingMyDocuments) {
      if (myDocumentsRes !== undefined) {
        setMyDocs(myDocumentsRes);
      }
    }
  }, [data, patientDocumentsRes, myDocumentsRes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUpload = (file: File, category: string) => {
    console.log("Document uploaded:", file.name, "Category:", category);
    // In a real app, this would make an API call to save the document
  };

  // Filter documents based on search query
  const filteredModelDocs = modelDocuments.filter((doc) =>
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPatientDocs = patientDocuments.filter(
    (doc) =>
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.owner_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMyDocs = myDocs.filter((doc) =>
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
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

                    <Button
                      variant={activeFolder === "my" ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${activeFolder === "my" ? "bg-mint-500 hover:bg-mint-600 text-white" : ""}`}
                      onClick={() => setActiveFolder("my")}
                    >
                      {activeFolder === "my" ? (
                        <FolderOpen size={18} />
                      ) : (
                        <Folder size={18} />
                      )}
                      Meus uploads
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
              {activeFolder === "models" && (
                <DocumentFolder
                  title="Modelos"
                  description="Documentos modelos para uso com pacientes"
                  documents={filteredModelDocs}
                />
              )}

              {activeFolder === "patients" && (
                <DocumentFolder
                  title="Pacientes"
                  description="Documentos enviados por ou para pacientes"
                  documents={filteredPatientDocs}
                  showPatientColumn
                />
              )}

              {activeFolder === "my" && (
                <DocumentFolder
                  title="Meus uploads"
                  description="Documentos enviados por mim"
                  documents={filteredMyDocs}
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
