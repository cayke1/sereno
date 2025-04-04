"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, LogIn, Mail, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";
import { useGetUser } from "@/lib/hooks/user/useGetUser";
import { useAuth } from "@/lib/contexts/auth-context";

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
  role: z.enum(["PATIENT", "PROFESSIONAL"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { register, user: loggedUser } = useAuth();
  const { professional_id } = useParams();
  if (!professional_id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">
          ID do profissional não encontrado
        </h1>
        <Link href="/" className="mt-4 text-mint-500 hover:text-mint-700">
          Página inicial
        </Link>
      </div>
    );
  }
  const [showPassword, setShowPassword] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUser(professional_id?.toString());
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
      professional_id: professional_id!.toString(),
      role: "PATIENT",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // register user
      // accept invite
      toast.success("Cadastro realizado", {
        description: "Você foi registrado com sucesso.",
      });
      // Here you would typically handle registration
    } catch (error: unknown) {
      console.error(error);
      toast.error("Falha ao realizar cadastro", {
        description: "Algum erro ocorreu durante o cadastro.",
      });
    }
  };

  useEffect(() => {
    if (loggedUser) {
      toast.success("Login realizado", {
        description: "Você já está autenticado.",
      });
      // Redirect to the dashboard or home page
      if (loggedUser.role === "PATIENT") {
        window.location.href = "/patient/portal";
      } else {
        window.location.href = "/dashboard";
      }
    }
  });

  return isLoading || error ? (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div>
        <Loader className="animate-spin h-10 w-10 text-mint-500" />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full bg-white rounded-lg shadow-md p-6 md:p-8 border border-border">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 gradient-heading">
            Criar Conta
          </h1>
          <h2>
            Convite enviado por: {user?.name} <br />
            <span className="text-mint-500 font-semibold">{user?.email}</span>
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-5">
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
                          href="/terms"
                          className="text-mint-500 hover:text-mint-700"
                        >
                          termos de serviço
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
