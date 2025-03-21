"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  mood: z.string({
    required_error: "Por favor, selecione seu humor.",
  }),
  predominant_feeling: z.string().min(1, {
    message: "O sentimento predominante é obrigatório.",
  }),
  description: z.string().optional(),
});

export default function FeelingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      predominant_feeling: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to your API
      console.log(values);

      // Simulate API call
      const res = await fetch("/api/feelings", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok)
        toast("Sentimento registrado!", {
          description: "Seu sentimento foi salvo com sucesso.",
        });

      form.reset();
    } catch (error) {
      console.log(error);
      toast("Erro", {
        description: "Houve um problema ao salvar seu sentimento.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Como você está se sentindo hoje?</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Humor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"neutral"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu humor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="veryBad">Muito Ruim</SelectItem>
                      <SelectItem value="bad">Ruim</SelectItem>
                      <SelectItem value="neutral">Neutro</SelectItem>
                      <SelectItem value="good">Bom</SelectItem>
                      <SelectItem value="veryGood">Muito Bom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="predominant_feeling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sentimento Predominante</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Feliz, Ansioso, Animado"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Qual é o principal sentimento que você está experimentando?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte mais sobre como você está se sentindo..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Sentimento"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
