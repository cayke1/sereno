"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Mail, UserPlus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { inviteService } from "@/lib/services/invite";
import { useState } from "react";

const invitePatientSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

type InvitePatientFormValues = z.infer<typeof invitePatientSchema>;
export function ModalInvitePatient() {
  const [open, setOpen] = useState(false);
  const form = useForm<InvitePatientFormValues>({
    resolver: zodResolver(invitePatientSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: InvitePatientFormValues) => {
    try {
      const req = await inviteService.handleSendInvite(data.email);
      if (!req || req instanceof Error) {
        throw new Error("Falha ao enviar convite");
      }
      toast.success("Convite enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar convite. Tente novamente.");
      console.error("Error inviting patient:", error);
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mint-500 hover:bg-mint-600 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Paciente
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-lg font-semibold">Convidar Paciente</h2>
          </DialogTitle>
        </DialogHeader>
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
            <Button type="submit" className="bg-mint-500 hover:bg-mint-600">
              Enviar Convite
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
