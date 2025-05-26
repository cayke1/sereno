"use client";

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
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(1, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [loading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLoading(isLoading);
    if (isLoading) {
      return;
    }
    if (!user) return;
    if (user.role === "PATIENT") {
      router.push("/patient/portal");
    }
    if (user.role === "PROFESSIONAL") {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error: unknown) {
      console.error(error);
    }
    // Here you would typically handle authentication
  };
  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full bg-white rounded-lg shadow-md p-6 md:p-8 border border-border">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 gradient-heading">
            Faça Login
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex justify-end">
                <Link
                  href="/auth/forgot_password"
                  className="text-sm text-mint-600 hover:text-mint-700"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-mint-500 hover:bg-mint-600"
              >
                Entrar
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Ainda não tem uma conta?{" "}
              <Link
                href="/auth/register"
                className="text-mint-600 hover:text-mint-700 font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
