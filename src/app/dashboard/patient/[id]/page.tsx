"use client";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmotionChart from "@/components/dashboard/EmotionChart";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Smile,
  User2,
  Activity,
  FilePlus,
  Download,
  Send,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useGetPatient } from "@/lib/hooks/professional-report/useGetPatient";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { formatDateVerbose } from "@/lib/formatDateVerbose";
import Image from "next/image";
import { ModalRegisterSession } from "@/components/dashboard/ModalRegisterSession";

interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  avatar: string;
  startDate: string;
  lastSession: string;
  nextSession: string;
  emotionScore: number;
  status: "active" | "inactive" | "archived";
  diagnoses: string[];
  goals: string[];
  relationId: string;
}

export default function PatientInfo() {
  const { id } = useParams();
  const { data, isLoading: isLoadingPatient } = useGetPatient(String(id));

  const [patient, setPatient] = useState<Patient | null>(null);

  const [isLoading, setIsLoading] = useState(isLoadingPatient);

  useEffect(() => {
    if (data !== undefined) {
      const newPatient = {
        ...data,
        nextSession: formatDateVerbose(data.nextSession),
        lastSession: formatDateVerbose(data.lastSession),
        startDate: formatDateVerbose(data.startDate),
      };
      setPatient(newPatient);
      setIsLoading(false);
    }
  }, [data]);

  // Mock data for emotion chart
  const emotionData = [
    { date: "01/06", calm: 65, joy: 70, anxiety: 20, sadness: 15 },
    { date: "08/06", calm: 60, joy: 65, anxiety: 25, sadness: 20 },
    { date: "15/06", calm: 55, joy: 55, anxiety: 35, sadness: 30 },
    { date: "22/06", calm: 50, joy: 50, anxiety: 40, sadness: 35 },
    { date: "29/06", calm: 60, joy: 60, anxiety: 30, sadness: 25 },
    { date: "06/07", calm: 70, joy: 75, anxiety: 20, sadness: 15 },
  ];

  // Mock data for emotional records
  const emotionalRecords = [
    {
      date: "20/06/2023",
      time: "20:15",
      emotion: "Alegria",
      intensity: 8,
      trigger: "Promoção no trabalho",
      notes: "Me senti valorizado e reconhecido pelo meu esforço.",
    },
    {
      date: "19/06/2023",
      time: "08:30",
      emotion: "Ansiedade",
      intensity: 6,
      trigger: "Reunião importante",
      notes: "Preocupação com a apresentação do projeto.",
    },
    {
      date: "18/06/2023",
      time: "22:00",
      emotion: "Calma",
      intensity: 7,
      trigger: "Meditação noturna",
      notes: "A prática de respiração ajudou a acalmar os pensamentos.",
    },
    {
      date: "17/06/2023",
      time: "16:45",
      emotion: "Frustração",
      intensity: 5,
      trigger: "Trânsito intenso",
      notes: "Atraso para um compromisso importante.",
    },
    {
      date: "16/06/2023",
      time: "13:20",
      emotion: "Satisfação",
      intensity: 7,
      trigger: "Almoço com amigos",
      notes: "Momento agradável de conexão social.",
    },
  ];

  return isLoading ? (
    <LoadingScreen />
  ) : (
    patient !== null && (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 bg-mint-50/30 py-8">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => redirect("/dashboard")}
                className="h-9 w-9"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold gradient-heading">
                Perfil do Paciente
              </h1>
            </div>

            <Card className="bg-white mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24">
                      <Image
                        src={patient.avatar}
                        width={96}
                        height={96}
                        alt={patient.name}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">
                          {patient.name}
                        </h2>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <User2 className="h-4 w-4" /> {patient.age} anos
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4" /> Paciente desde{" "}
                          {patient.startDate}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <ModalRegisterSession professionalPatientId={patient.relationId} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <Card className="bg-mint-50 border border-mint-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-mint-700">
                                Próxima Sessão
                              </p>
                              <p className="text-lg font-medium">
                                {patient.nextSession || "Não agendada"}
                              </p>
                            </div>
                            <Calendar className="h-5 w-5 text-mint-700" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-sand-50 border border-sand-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-sand-700">Status</p>
                              <p className="text-lg font-medium capitalize">
                                {patient.status === "active" && "Ativo"}
                                {patient.status === "inactive" && "Inativo"}
                                {patient.status === "archived" && "Arquivado"}
                              </p>
                            </div>
                            <Activity className="h-5 w-5 text-sand-700" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main content with tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content area - tabs */}
              <div className="lg:col-span-2">
                <Tabs
                  defaultValue="overview"
                  className="bg-white rounded-lg border shadow-sm"
                >
                  <TabsList className="bg-muted/50 p-0 h-14 justify-start rounded-b-none border-b w-full">
                    <TabsTrigger
                      value="overview"
                      className="h-14 data-[state=active]:bg-white rounded-none px-6"
                    >
                      Visão Geral
                    </TabsTrigger>
                    <TabsTrigger
                      value="emotions"
                      className="h-14 data-[state=active]:bg-white rounded-none px-6"
                    >
                      Registros Emocionais
                    </TabsTrigger>
                    <TabsTrigger
                      value="notes"
                      className="h-14 data-[state=active]:bg-white rounded-none px-6"
                    >
                      Anotações
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Informações Pessoais
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Email
                            </p>
                            <p>{patient.email}</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Telefone
                            </p>
                            <p>{patient.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Diagnósticos
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {patient.diagnoses.map((diagnosis, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-mint-100 text-mint-700 rounded-full text-sm"
                            >
                              {diagnosis}
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-muted-foreground"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Objetivos Terapêuticos
                        </h3>
                        <div className="space-y-2">
                          {patient.goals.map((goal, index) => (
                            <div
                              key={index}
                              className="p-3 bg-muted rounded-lg flex items-center gap-3"
                            >
                              <div className="h-2 w-2 rounded-full bg-mint-500" />
                              <p>{goal}</p>
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-muted-foreground"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar Objetivo
                          </Button>
                        </div>
                      </div>

                      <EmotionChart
                        data={emotionData}
                        title="Tendências Emocionais"
                        description="Evolução emocional ao longo do tempo"
                      />
                    </div>
                  </TabsContent>

                  {/* Emotional Records Tab */}
                  <TabsContent value="emotions" className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Registros Emocionais
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="text-mint-700 border-mint-200 hover:bg-mint-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Exportar
                        </Button>
                        <Button className="bg-mint-500 hover:bg-mint-600 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Registro
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {emotionalRecords.map((record, index) => (
                        <Card
                          key={index}
                          className="bg-white hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  {record.date} • {record.time}
                                </p>
                                <div className="flex items-center gap-2 my-1">
                                  <h4 className="font-medium">
                                    {record.emotion}
                                  </h4>
                                  <div className="px-2 py-0.5 bg-sky-100 text-sky-700 text-xs rounded-full">
                                    Intensidade: {record.intensity}/10
                                  </div>
                                </div>
                                <p className="text-sm mb-2">
                                  <span className="font-medium">Gatilho:</span>{" "}
                                  {record.trigger}
                                </p>
                                <p className="text-sm bg-muted p-2 rounded-lg">
                                  &quot;{record.notes}&quot;
                                </p>
                              </div>

                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                  record.emotion === "Alegria"
                                    ? "bg-green-100 text-green-700"
                                    : record.emotion === "Calma"
                                      ? "bg-mint-100 text-mint-700"
                                      : record.emotion === "Ansiedade"
                                        ? "bg-amber-100 text-amber-700"
                                        : record.emotion === "Frustração"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-sky-100 text-sky-700"
                                }`}
                              >
                                <Smile className="h-6 w-6" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Notes Tab */}
                  <TabsContent value="notes" className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Anotações e Documentos
                      </h3>
                      <Button className="bg-mint-500 hover:bg-mint-600 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Nova Anotação
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                Avaliação Inicial
                              </CardTitle>
                              <CardDescription>
                                10/01/2023 • Documento PDF
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Avaliação inicial completa com histórico,
                            diagnósticos e plano terapêutico.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                Evoluções Trimestrais
                              </CardTitle>
                              <CardDescription>
                                15/04/2023 • Documento PDF
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Relatório de evolução terapêutica do primeiro
                            trimestre de tratamento.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                Técnicas Recomendadas
                              </CardTitle>
                              <CardDescription>
                                05/05/2023 • Nota
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Lista de técnicas de respiração e mindfulness
                            recomendadas para prática diária.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="justify-start w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                      >
                        <Calendar className="h-4 w-4 mr-3" />
                        Agendar Sessão
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                      >
                        <FileText className="h-4 w-4 mr-3" />
                        Adicionar documentos
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Linha do Tempo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-border">
                      {[
                        {
                          title: "Sessão agendada",
                          description: "29 de Junho, 2023 - 14:00",
                          time: "Em 6 dias",
                          icon: <Calendar className="h-4 w-4 text-mint-700" />,
                        },
                        {
                          title: "Registro emocional",
                          description: "Alegria (8/10) - Promoção no trabalho",
                          time: "Há 2 dias",
                          icon: <Smile className="h-4 w-4 text-sky-700" />,
                        },
                        {
                          title: "Sessão realizada",
                          description:
                            "Avaliamos progresso nas técnicas de respiração",
                          time: "Há 7 dias",
                          icon: <FilePlus className="h-4 w-4 text-mint-700" />,
                        },
                        {
                          title: "Documento compartilhado",
                          description:
                            "Técnicas para lidar com a ansiedade no trabalho",
                          time: "Há 10 dias",
                          icon: <FileText className="h-4 w-4 text-sand-700" />,
                        },
                      ].map((item, index) => (
                        <div key={index} className="relative pl-8">
                          <div className="absolute left-0 top-1 h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.time}
                          </p>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground text-xs ml-8"
                      >
                        Ver histórico completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  );
}
