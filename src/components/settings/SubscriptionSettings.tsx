"use client";
import { AlertCircle, CheckCircle2, CreditCard, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../ui/LoadingScreen";
import { Plan, plans } from "../home/Pricing";
import { useSubscription } from "@/lib/contexts/subscription-context";

interface SubscriptionSettingsProps {
  professional_id: string;
}

interface Subscription {
  id: string;
  plan: string;
  status: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}
export function SubscriptionSettings({
  professional_id,
}: SubscriptionSettingsProps) {
  const { handleCancel } = useSubscription();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plan, setPlan] = useState<Plan | null>();

  const fetchSubscription = async (id: string) => {
    try {
      const res = await fetch(`/api/subscription/get/${id}`);
      if (!res.ok) {
        throw new Error("Erro ao buscar assinatura");
      }
      const data = await res.json();
      const subData = {
        ...data,
        price: data.plan === "BASIC" ? 59.99 : 259.99,
      };
      const planData = plans.find((p) => p.api_name === subData.plan);
      if (!planData) {
        throw new Error("Plano não encontrado");
      }
      setPlan(planData);
      setSubscription(subData);
      return data;
    } catch (error: unknown) {
      setSubscription(null);
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetchSubscription(professional_id);
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
  }, [isLoading, professional_id]);

  const handleCancelSubscription = async () => {
    const request = await handleCancel(professional_id);
    if (request) {
      toast.success("Cancelamento solicitado", {
        description:
          "Você pode continuar usando o serviço até o fim do período pago.",
      });
      return;
    }
    toast.error("Falha ao solicitar cancelamento");
  };

  const handleUpdatePayment = () => {
    // In a real app, this would redirect to payment update page or open Stripe portal
    toast.success("Redirecionando para o portal de pagamento", {
      description:
        "Você será redirecionado para atualizar suas informações de pagamento.",
    });
  };
  return (
    <div>
      {isLoading && <LoadingScreen />}

      {!isLoading && subscription === null && (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h2>Você não possui assinatura ativa</h2>

          <Link href="/dashboard/select-plan">
            <Button className="bg-mint-500 hover:bg-mint-600 text-white">
              Selecionar um plano
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && subscription != null && (
        <>
          <h2 className="text-xl font-semibold mb-6">Detalhes da Assinatura</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Plano {plan?.name}</CardTitle>
                    {subscription.status === "ACTIVE" ? (
                      <Badge className="bg-green-500">Ativo</Badge>
                    ) : (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Próxima cobrança
                      </span>
                      <span className="font-medium">
                        {formatDate({ date: subscription.createdAt })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor</span>
                      <span className="font-medium">
                        R$ {subscription.price.toFixed(2).replace(".", ",")}{" "}
                        /mês
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Status do pagamento
                      </span>
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 size={16} className="mr-1" />
                        <span>Em dia</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 pt-3">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={handleUpdatePayment}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Atualizar Pagamento
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-destructive border-destructive hover:bg-destructive/10"
                      >
                        Cancelar Assinatura
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar Cancelamento</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja cancelar sua assinatura? Você
                          perderá acesso a todos os recursos premium ao final do
                          período atual.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" className="mr-2">
                          Voltar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleCancelSubscription}
                        >
                          Sim, cancelar assinatura
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-mint-500" />
                    Benefícios do Plano
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan?.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-mint-500 mt-0.5" />
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-mint-500 hover:bg-mint-600"
                  >
                    <Link href="/#pricing">Ver outros planos</Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-4 flex items-start p-4 border rounded-lg bg-blue-50 border-blue-200">
                <AlertCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-700">
                  Precisa de ajuda com sua assinatura? Entre em contato com
                  nosso suporte pelo email
                  <a
                    href="mailto:suporte@sereno.com"
                    className="font-medium text-blue-700 hover:underline ml-1"
                  >
                    suporte@sereno.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
