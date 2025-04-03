import PatientCard from "@/components/dashboard/PatientCard";
import EmotionChart from "@/components/dashboard/EmotionChart";
import {
  Bell,
  Calendar,
  Plus,
  Search,
  Smile,
  UserPlus,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/layout/Footer";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function Page() {
  // Mock data for patients
  const patients = [
    {
      id: "1",
      name: "Rafael Oliveira",
      lastSession: "15 Jun 2023",
      nextSession: "29 Jun 2023",
      avatar: "",
      emotionScore: 85,
      trends: ["up", "up", "stable", "up", "stable"],
      status: "active" as const,
    },
    {
      id: "2",
      name: "Marina Santos",
      lastSession: "12 Jun 2023",
      nextSession: "26 Jun 2023",
      avatar: "",
      emotionScore: 65,
      trends: ["down", "stable", "up", "stable", "up"],
      status: "active" as const,
    },
    {
      id: "3",
      name: "Lucas Mendes",
      lastSession: "18 Jun 2023",
      nextSession: null,
      avatar: "",
      emotionScore: 40,
      trends: ["down", "down", "stable", "down", "up"],
      status: "active" as const,
    },
    {
      id: "4",
      name: "Juliana Costa",
      lastSession: "20 Jun 2023",
      nextSession: "27 Jun 2023",
      avatar: "",
      emotionScore: 75,
      trends: ["stable", "up", "up", "stable", "up"],
      status: "new" as const,
    },
  ];

  // Mock data for emotion chart
  const emotionData = [
    { date: "01/06", calm: 65, joy: 70, anxiety: 20, sadness: 15 },
    { date: "08/06", calm: 60, joy: 65, anxiety: 25, sadness: 20 },
    { date: "15/06", calm: 55, joy: 55, anxiety: 35, sadness: 30 },
    { date: "22/06", calm: 50, joy: 50, anxiety: 40, sadness: 35 },
    { date: "29/06", calm: 60, joy: 60, anxiety: 30, sadness: 25 },
    { date: "06/07", calm: 70, joy: 75, anxiety: 20, sadness: 15 },
  ];

  // Mock data for upcoming sessions
  const upcomingSessions = [
    { patient: "Rafael Oliveira", date: "29 Jun", time: "14:00" },
    { patient: "Marina Santos", date: "26 Jun", time: "10:30" },
    { patient: "Juliana Costa", date: "27 Jun", time: "16:00" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 bg-mint-50/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-heading">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo de volta ao seu espaço Sereno
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9 w-full sm:w-64 bg-white"
                  placeholder="Buscar pacientes..."
                />
              </div>
              <Button className="bg-mint-500 hover:bg-mint-600 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Paciente
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white hover-lift">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-mint-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-mint-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total de Pacientes
                  </p>
                  <p className="text-2xl font-semibold">24</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover-lift">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-sky-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Sessões da Semana
                  </p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover-lift">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-sand-100 flex items-center justify-center">
                  <Smile className="h-6 w-6 text-sand-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Novos Registros
                  </p>
                  <p className="text-2xl font-semibold">36</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Patients List */}
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Seus Pacientes</CardTitle>
                      <CardDescription>
                        Gerencie seus pacientes e acompanhe seu progresso
                      </CardDescription>
                    </div>
                    <Tabs defaultValue="all">
                      <TabsList className="bg-muted/50">
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="active">Ativos</TabsTrigger>
                        <TabsTrigger value="new">Novos</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patients.map((patient) => (
                      <PatientCard key={patient.id} patient={{
                        avatar: patient.avatar,
                        name: patient.name,
                        lastSession: patient.lastSession,
                        nextSession: patient.nextSession,
                        emotionScore: patient.emotionScore,
                        status: patient.status,
                        trends: patient.trends as ("up" | "down" | "stable")[],
                        id: patient.id,
                      }} />
                    ))}
                    <div className="card-base flex flex-col items-center justify-center min-h-52 border-dashed">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-mint-700"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Adicionar paciente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emotion Chart */}
              <div className="mt-8">
                <EmotionChart
                  data={emotionData}
                  title="Tendências Emocionais Coletivas"
                  description="Média de emoções dos seus pacientes nos últimos 2 meses"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Upcoming Sessions */}
              <Card className="bg-white mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Próximas Sessões</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-mint-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Sua agenda dos próximos dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-mint-50 border border-mint-100"
                      >
                        <div>
                          <p className="font-medium">{session.patient}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {session.date}, {session.time}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Calendar className="h-4 w-4 text-mint-700" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                    >
                      Ver todas as sessões
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Notificações</span>
                    <div className="px-2 py-0.5 bg-mint-100 text-mint-700 text-xs rounded-full">
                      3 novas
                    </div>
                  </CardTitle>
                  <CardDescription>Atualizações recentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Novo registro emocional",
                        description:
                          "Marina Santos registrou uma nova entrada.",
                        time: "Há 30 minutos",
                        icon: <Smile className="h-4 w-4 text-sky-500" />,
                        isNew: true,
                      },
                      {
                        title: "Lembrete de sessão",
                        description:
                          "Você tem uma sessão com Rafael amanhã às 14h.",
                        time: "Há 2 horas",
                        icon: <Calendar className="h-4 w-4 text-mint-500" />,
                        isNew: true,
                      },
                      {
                        title: "Relatório semanal disponível",
                        description:
                          "O relatório de Lucas Mendes está disponível.",
                        time: "Há 5 horas",
                        icon: <Bell className="h-4 w-4 text-sand-700" />,
                        isNew: true,
                      },
                      {
                        title: "Paciente atualizado",
                        description:
                          "Você atualizou os dados de Juliana Costa.",
                        time: "Ontem",
                        icon: (
                          <Users className="h-4 w-4 text-muted-foreground" />
                        ),
                        isNew: false,
                      },
                    ].map((notification, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          notification.isNew
                            ? "bg-mint-50 border border-mint-100"
                            : "bg-muted/20 border border-border"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{notification.icon}</div>
                          <div>
                            <p className="font-medium text-sm">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                    >
                      Ver todas as notificações
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
  );
};
