"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff, LogIn, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import { useAuth } from "@/lib/contexts/auth-context";
import { useGetInvite } from "@/lib/hooks/invite/useGetInvite";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os termos para continuar",
  }),
  professional_id: z.string(),
  invite_id: z.string(),
  role: z.literal("PATIENT"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { registerPatient, user: loggedUser } = useAuth();
  const { invite_id } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const {
    data: invite,
    isLoading,
    error,
  } = useGetInvite(invite_id!.toString());

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
      professional_id: "",
      role: "PATIENT",
      invite_id: "",
    },
  });

  // Preenche o formulário com dados do convite
  useEffect(() => {
    if (invite) {
      form.reset({
        name: "",
        email: invite.sent_to ?? "",
        password: "",
        termsAccepted: false,
        professional_id: invite.professional?.id ?? "",
        role: "PATIENT",
        invite_id: invite.id ?? "",
      });
    }
  }, [invite, form]);

  useEffect(() => {
    if (loggedUser) {
      toast.success("Login realizado", {
        description: "Você já está autenticado.",
      });
      const redirectPath =
        loggedUser.role === "PATIENT" ? "/patient/portal" : "/dashboard";
      window.location.href = redirectPath;
    }
  }, [loggedUser]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerPatient(data.name, data.email, data.password, data.professional_id, data.invite_id);
      toast.success("Cadastro realizado", {
        description: "Você foi registrado com sucesso.",
      });
    } catch (error: unknown) {
      console.error(error);
      toast.error("Falha ao realizar cadastro", {
        description: "Algum erro ocorreu durante o cadastro.",
      });
    }
  };

  if (isLoading || error || !invite) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full bg-white rounded-lg shadow-md p-6 md:p-8 border border-border">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 gradient-heading">
            Criar Conta
          </h1>

          <h2 className="text-center text-muted-foreground text-sm mb-6">
            Convite enviado por: <strong>{invite.professional?.name}</strong>
            <br />
            <span className="text-mint-500 font-semibold">
              {invite.professional?.email}
            </span>
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Seu nome"
                          {...field}
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="seu@email.com"
                          {...field}
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="******"
                          {...field}
                          className="pl-10 pr-10"
                        />
                        <LogIn className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Aceite de Termos */}
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <p className="text-sm font-normal">
                        Eu concordo com os{" "}
                        <Link
                          href="/use-terms"
                          className="text-mint-500 hover:text-mint-700"
                        >
                          termos de uso
                        </Link>{" "}
                        e{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-mint-500 hover:text-mint-700"
                        >
                          política de privacidade
                        </Link>
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-mint-500 hover:bg-mint-600"
              >
                Criar Conta
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                href="/auth/login"
                className="text-mint-600 hover:text-mint-700 font-medium"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
