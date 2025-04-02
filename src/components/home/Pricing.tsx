import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { pricingFormatter } from "@/lib/priceFormatter";
import Link from "next/link";

// Plan features interface
interface PlanFeature {
  included: boolean;
  text: string;
}

// Plan interface
interface Plan {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
}

export function Pricing() {
  const plans: Plan[] = [
    {
      name: "Básico",
      price: 59.99,
      description:
        "Ideal para profissionais autônomos iniciando na prática clínica",
      features: [
        { included: true, text: "Até 5 pacientes ativos" },
        { included: true, text: "Monitoramento emocional básico" },
        { included: true, text: "Comunicação via mensagens" },
        { included: false, text: "Relatórios avançados" },
        { included: false, text: "Integração com agenda" },
      ],
    },
    {
      name: "Ilimitado",
      price: 259.99,
      isPopular: true,
      description: "Para clínicas de grande porte e instituições",
      features: [
        { included: true, text: "Pacientes ilimitados" },
        { included: true, text: "Monitoramento emocional completo" },
        { included: true, text: "Comunicação via mensagens" },
        { included: false, text: "Relatórios avançados" },
        { included: false, text: "Integração com agenda" },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white border-t border-border">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
            Planos e Preços
          </h2>
          <p className="text-lg text-foreground/80">
            Escolha o plano ideal para sua prática clínica e comece a
            transformar o acompanhamento dos seus pacientes.
          </p>
        </div>

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
                <p className="text-muted-foreground mb-6">{plan.description}</p>
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
                <Link href="/auth/register">
                  <Button
                    className={`w-full ${
                      plan.isPopular
                        ? "bg-mint-500 hover:bg-mint-600"
                        : "bg-foreground/10 hover:bg-foreground/20 text-foreground"
                    }`}
                  >
                    Escolher {plan.name}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
