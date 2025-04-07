"use client";
import Footer from "@/components/layout/Footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Smile,
  Activity,
  Plus,
  Download,
} from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { redirect } from "next/navigation";

// Form schemas for validation
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().min(10, { message: "Número de telefone inválido." }),
  address: z
    .string()
    .min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }),
  occupation: z
    .string()
    .min(2, { message: "Profissão deve ter pelo menos 2 caracteres." }),
});

const emotionFormSchema = z.object({
  emotion: z.string().min(1, { message: "Escolha uma emoção." }),
  intensity: z.string().min(1, { message: "Defina a intensidade." }),
  trigger: z.string().min(3, { message: "Descreva o gatilho." }),
  notes: z
    .string()
    .min(5, { message: "Adicione mais detalhes sobre como se sentiu." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type EmotionFormValues = z.infer<typeof emotionFormSchema>;

export default function PatientPortal() {
  const [emotionDialogOpen, setEmotionDialogOpen] = useState(false);

  // Mock patient data (in a real app, this would come from an API/backend)
  const [patientData, setPatientData] = useState({
    name: "Rafael Oliveira",
    email: "rafael.oliveira@email.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo, SP",
    occupation: "Engenheiro de Software",
    startDate: "10 de Janeiro, 2023",
    nextSession: "29 de Junho, 2023, 14:00",
  });

  // Mock emotional records
  const [emotionalRecords, setEmotionalRecords] = useState([
    {
      date: "20/06/2023",
      time: "20:15",
      emotion: "Alegria",
      intensity: "8",
      trigger: "Promoção no trabalho",
      notes: "Me senti valorizado e reconhecido pelo meu esforço.",
    },
    {
      date: "19/06/2023",
      time: "08:30",
      emotion: "Ansiedade",
      intensity: "6",
      trigger: "Reunião importante",
      notes: "Preocupação com a apresentação do projeto.",
    },
    {
      date: "18/06/2023",
      time: "22:00",
      emotion: "Calma",
      intensity: "7",
      trigger: "Meditação noturna",
      notes: "A prática de respiração ajudou a acalmar os pensamentos.",
    },
  ]);

  // Form for profile updating
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
      address: patientData.address,
      occupation: patientData.occupation,
    },
  });

  // Form for adding emotional records
  const emotionForm = useForm<EmotionFormValues>({
    resolver: zodResolver(emotionFormSchema),
    defaultValues: {
      emotion: "",
      intensity: "",
      trigger: "",
      notes: "",
    },
  });

  // Function to handle profile form submission
  function onProfileSubmit(data: ProfileFormValues) {
    setPatientData({
      ...patientData,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      occupation: data.occupation,
    });

    toast("Perfil atualizado", {
      description: "Suas informações foram atualizadas com sucesso.",
    });
  }

  // Function to handle emotion form submission
  function onEmotionSubmit(data: EmotionFormValues) {
    const today = new Date();
    const date = today.toLocaleDateString("pt-BR");
    const time = today.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newRecord = {
      date,
      time,
      emotion: data.emotion,
      intensity: data.intensity,
      trigger: data.trigger,
      notes: data.notes,
    };

    setEmotionalRecords([newRecord, ...emotionalRecords]);
    setEmotionDialogOpen(false);
    emotionForm.reset();

    toast("Registro emocional adicionado", {
      description: "Seu registro emocional foi salvo com sucesso.",
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 bg-mint-50/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          {/* Page title */}
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => redirect("/")}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold gradient-heading">
              Meu Portal
            </h1>
          </div>

          {/* Patient profile section */}
          <Card className="bg-white mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-mint-100 text-mint-700 text-2xl">
                      {patientData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {patientData.name}
                      </h2>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Paciente desde{" "}
                        {patientData.startDate}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card className="bg-mint-50 border border-mint-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-mint-700">
                              Próxima Sessão
                            </p>
                            <p className="text-lg font-medium">
                              {patientData.nextSession || "Não agendada"}
                            </p>
                          </div>
                          <Calendar className="h-5 w-5 text-mint-700" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-sky-50 border border-sky-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-sky-700">
                              Acompanhamento
                            </p>
                            <p className="text-lg font-medium">Semanal</p>
                          </div>
                          <Activity className="h-5 w-5 text-sky-700" />
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
                defaultValue="profile"
                className="bg-white rounded-lg border shadow-sm"
              >
                <TabsList className="bg-muted/50 p-0 h-14 justify-start rounded-b-none border-b w-full">
                  <TabsTrigger
                    value="profile"
                    className="h-14 data-[state=active]:bg-white rounded-none px-6"
                  >
                    Meu Perfil
                  </TabsTrigger>
                  <TabsTrigger
                    value="emotions"
                    className="h-14 data-[state=active]:bg-white rounded-none px-6"
                  >
                    Meus Registros
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    className="h-14 data-[state=active]:bg-white rounded-none px-6"
                  >
                    Documentos
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Minhas Informações
                      </h3>

                      <Form {...profileForm}>
                        <form
                          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome completo</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Seu nome completo"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Seu email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Seu telefone"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Seu endereço"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Profissão</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Sua profissão"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full md:w-auto bg-mint-500 hover:bg-mint-600 text-white"
                          >
                            Salvar alterações
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </TabsContent>

                {/* Emotional Records Tab */}
                <TabsContent value="emotions" className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Meus Registros Emocionais
                    </h3>
                    <Dialog
                      open={emotionDialogOpen}
                      onOpenChange={setEmotionDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-mint-500 hover:bg-mint-600 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Registro
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Registrar Emoção</DialogTitle>
                          <DialogDescription>
                            Registre como você está se sentindo neste momento.
                          </DialogDescription>
                        </DialogHeader>

                        <Form {...emotionForm}>
                          <form
                            onSubmit={emotionForm.handleSubmit(onEmotionSubmit)}
                            className="space-y-4"
                          >
                            <FormField
                              control={emotionForm.control}
                              name="emotion"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Emoção</FormLabel>
                                  <FormControl>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      {...field}
                                    >
                                      <option value="">
                                        Selecione uma emoção
                                      </option>
                                      <option value="Alegria">Alegria</option>
                                      <option value="Tristeza">Tristeza</option>
                                      <option value="Raiva">Raiva</option>
                                      <option value="Medo">Medo</option>
                                      <option value="Ansiedade">
                                        Ansiedade
                                      </option>
                                      <option value="Calma">Calma</option>
                                      <option value="Frustração">
                                        Frustração
                                      </option>
                                      <option value="Surpresa">Surpresa</option>
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={emotionForm.control}
                              name="intensity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Intensidade (1-10)</FormLabel>
                                  <FormControl>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      {...field}
                                    >
                                      <option value="">
                                        Selecione a intensidade
                                      </option>
                                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                        (num) => (
                                          <option
                                            key={num}
                                            value={num.toString()}
                                          >
                                            {num}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={emotionForm.control}
                              name="trigger"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gatilho</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="O que causou essa emoção?"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={emotionForm.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Detalhes</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Descreva como você se sentiu..."
                                      className="min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <DialogFooter>
                              <Button
                                type="submit"
                                className="bg-mint-500 hover:bg-mint-600 text-white"
                              >
                                Salvar registro
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-4">
                    {emotionalRecords.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">
                          Você ainda não tem registros emocionais.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => setEmotionDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Criar primeiro registro
                        </Button>
                      </div>
                    ) : (
                      emotionalRecords.map((record, index) => (
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
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Meus Documentos
                  </h3>

                  <div className="space-y-4">
                    <Card className="bg-white">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Plano de Tratamento
                            </CardTitle>
                            <CardDescription>
                              Compartilhado em 15/01/2023
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
                          Plano de tratamento inicial com objetivos
                          terapêuticos.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Exercícios de Mindfulness
                            </CardTitle>
                            <CardDescription>
                              Compartilhado em 05/02/2023
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
                          Guia com técnicas de respiração e mindfulness para
                          prática diária.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Diário de Emoções - Template
                            </CardTitle>
                            <CardDescription>
                              Compartilhado em 20/03/2023
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
                          Template para registro diário de emoções e situações.
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
                      className="justify-start w-full bg-mint-500 hover:bg-mint-600 text-white"
                      onClick={() => setEmotionDialogOpen(true)}
                    >
                      <Smile className="h-4 w-4 mr-3" />
                      Registrar Emoção
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                    >
                      <Calendar className="h-4 w-4 mr-3" />
                      Ver Agenda
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                    >
                      <MessageSquare className="h-4 w-4 mr-3" />
                      Mensagem ao Terapeuta
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start w-full text-mint-700 border-mint-200 hover:bg-mint-50"
                    >
                      <FileText className="h-4 w-4 mr-3" />
                      Meus Documentos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reminders */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Lembretes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-mint-50 border border-mint-100 rounded-lg flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-mint-700 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Próxima sessão</h4>
                        <p className="text-sm text-muted-foreground">
                          29 de Junho, 2023 - 14:00
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg flex items-start gap-3">
                      <FileText className="h-5 w-5 text-sky-700 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Exercícios diários</h4>
                        <p className="text-sm text-muted-foreground">
                          Não esqueça de praticar a técnica de respiração
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                      <Smile className="h-5 w-5 text-amber-700 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Registro de emoções</h4>
                        <p className="text-sm text-muted-foreground">
                          Lembre-se de registrar como se sentiu hoje
                        </p>
                      </div>
                    </div>
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
}
