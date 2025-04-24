"use client";
import { plans } from "@/components/home/Pricing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/lib/contexts/auth-context";
import { useSubscription } from "@/lib/contexts/subscription-context";
import { pricingFormatter } from "@/lib/priceFormatter";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SelectPlan() {
  const { user } = useAuth();
  const { handleCheckout } = useSubscription();

  const handlePlanSelection = async (plan: "BASIC" | "UNLIMITED") => {
    try {
      await handleCheckout(plan.toLocaleLowerCase() as "basic" | "unlimited");
    } catch (error) {
      toast.error("Ocorreu um erro ao processar o pagamento.");
      console.error("Erro ao processar o pagamento:", error);
    }
  };

  return (
    <div className="">
      <div className="container max-w-[75%] mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full bg-white rounded-lg shadow-md p-6 md:p-8 border border-border">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 gradient-heading">
            Selecionar um plano
          </h1>

          <p className="text-sm text-muted-foreground mb-6 text-center">
            Olá {user?.name}, escolha um plano para continuar.
            <br /> você pode mudar de plano a qualquer momento.
            <br /> <br /> Se você não tem certeza de qual plano escolher, entre
            em contato com o suporte.
          </p>

          <div className="flex justify-between items-center gap-4 p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden border ${
                    plan.isPopular
                      ? "border-mint-300 shadow-lg shadow-mint-100"
                      : "border-border shadow-sm"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-mint-500 text-white text-xs px-3 py-1 font-medium rounded-bl-md">
                        Mais popular
                      </div>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">
                        {pricingFormatter(plan.price)}
                      </span>
                      <span className="text-muted-foreground ml-1">/mês</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2
                            className={`mr-2 h-5 w-5 shrink-0 ${
                              feature.included
                                ? "text-mint-500"
                                : "text-muted-foreground/30"
                            }`}
                            strokeWidth={feature.included ? 2 : 1}
                          />
                          <span
                            className={
                              feature.included ? "" : "text-muted-foreground/50"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Button
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-mint-500 hover:bg-mint-600"
                          : "bg-foreground/10 hover:bg-foreground/20 text-foreground"
                      }`}
                      onClick={() => handlePlanSelection(plan.api_name)}
                    >
                      Escolher {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

          </div>
        </div>
            <Link className="underline text-gray-400 text-center " href="/dashboard">
              <p>Fazer isso mais tarde</p>
            </Link>
      </div>
    </div>
  );
}
