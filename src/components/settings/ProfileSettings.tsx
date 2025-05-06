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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { UserService } from "@/lib/services/user";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor insira um email válido." }),
  title: z.string().optional(),
  specialty: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface DefaultValues {
  name?: string;
  email?: string;
  title?: string;
  specialty?: string;
  imageUrl?: string;
}
export function ProfileSettings(defaultValues: DefaultValues) {
  const userService = UserService;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    console.log(data);
    if (imageFile) {
      try {
        const res = await userService.sendImage(imageFile);
        if (res) {
          toast.success("Imagem enviada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao enviar imagem");
        console.log(error);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Perfil atualizado", {
      description: "Suas informações foram atualizadas com sucesso.",
    });

    setIsLoading(false);
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Informações do Perfil</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 mb-4">
            {imagePreview ? (
              <AvatarImage src={imagePreview} alt="User profile picture" />
            ) : (
              <AvatarImage
                src={defaultValues.imageUrl}
                alt="User profile picture"
              />
            )}
          </Avatar>

          <div className="relative">
            <label
              htmlFor="picture"
              className="flex items-center gap-2 cursor-pointer bg-mint-50 hover:bg-mint-100 text-mint-700 border border-mint-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Camera size={16} />
              <span>Alterar foto</span>
            </label>
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
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
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título profissional</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Psicólogo, Psiquiatra"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Terapia Cognitivo-Comportamental"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="bg-mint-500 hover:bg-mint-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
