import {
  Calendar,
  LineChart,
  MessagesSquare,
  SendHorizonal,
  UserRound,
  Zap,
} from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Monitoramento Emocional",
      description:
        "Acompanhe o progresso emocional dos pacientes ao longo do tempo com visualizações claras e intuitivas.",
      icon: <LineChart className="w-12 h-12 text-mint-500" strokeWidth={1.5} />,
      color: "bg-mint-50",
      border: "border-mint-200",
    },
    {
      title: "Comunicação Facilitada",
      description:
        "Mantenha contato com seus pacientes através de um sistema de mensagens seguro e privado.",
      icon: (
        <MessagesSquare className="w-12 h-12 text-sky-500" strokeWidth={1.5} />
      ),
      color: "bg-sky-50",
      border: "border-sky-200",
    },
    {
      title: "Relatórios Semanais",
      description:
        "Receba e envie relatórios automatizados que resumem o estado emocional semanal de cada paciente.",
      icon: (
        <SendHorizonal
          className="w-12 h-12 text-accent"
          strokeWidth={1.5}
        />
      ),
      color: "bg-sand-50",
      border: "border-sand-200",
    },
    {
      title: "Gestão de Pacientes",
      description:
        "Organize sua prática clínica com um sistema de gestão de pacientes simples e eficiente.",
      icon: <UserRound className="w-12 h-12 text-mint-500" strokeWidth={1.5} />,
      color: "bg-mint-50",
      border: "border-mint-200",
    },
    {
      title: "Agendamento Inteligente",
      description:
        "Planeje suas sessões com um calendário intuitivo que se integra aos registros emocionais.",
      icon: <Calendar className="w-12 h-12 text-sky-500" strokeWidth={1.5} />,
      color: "bg-sky-50",
      border: "border-sky-200",
    },
    {
      title: "Insights Personalizados",
      description:
        "Obtenha análises e padrões emocionais para cada paciente, facilitando intervenções precisas.",
      icon: <Zap className="w-12 h-12 text-accent" strokeWidth={1.5} />,
      color: "bg-sand-50",
      border: "border-sand-200",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
            Recursos projetados para profissionais de saúde mental
          </h2>
          <p className="text-lg text-foreground/80">
            Ferramentas intuitivas que se integram naturalmente ao seu fluxo de
            trabalho, proporcionando mais tempo para o que realmente importa:
            seus pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} rounded-xl p-8 border ${feature.border} hover-lift`}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
