import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Brain, HandHeart, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

export default function Home() {
  const testimonials = [
    {
      quote:
        "O Sereno revolucionou minha prática clínica. Agora consigo acompanhar o progresso emocional dos meus pacientes de forma visual e intuitiva.",
      author: "Dra. Mariana Silva",
      role: "Psicóloga Clínica",
      avatar: <Brain className="h-12 w-12 text-mint-500" />,
    },
    {
      quote:
        "A plataforma me ajudou a identificar padrões emocionais que eu não percebia nas sessões tradicionais. Uma ferramenta indispensável para o acompanhamento entre sessões.",
      author: "Dr. Carlos Mendes",
      role: "Psiquiatra",
      avatar: <HeartPulse className="h-12 w-12 text-sky-500" />,
    },
    {
      quote:
        "Meus pacientes adoram receber os relatórios semanais e se sentem mais engajados no processo terapêutico. A interface é intuitiva e acolhedora.",
      author: "Dra. Lúcia Ferreira",
      role: "Terapeuta",
      avatar: <HandHeart className="h-12 w-12 text-sand-200" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <Hero />
        <Features />

        {/* About Section */}
        <section id="about" className="py-20 gradient-bg-soft">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
                Sobre o Sereno
              </h2>
              <p className="text-lg text-foreground/80">
                Nascemos da necessidade de tornar o acompanhamento em saúde
                mental mais contínuo, humano e eficaz. Nossa missão é criar
                pontes entre sessões e proporcionar insights valiosos para
                profissionais e pacientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Nossa Missão",
                  description:
                    "Transformar o acompanhamento da saúde mental com ferramentas que priorizam a humanização e a continuidade do cuidado.",
                  color: "bg-mint-50",
                  border: "border-mint-200",
                },
                {
                  title: "Nossa Visão",
                  description:
                    "Um mundo onde a saúde mental é acompanhada com a mesma precisão e cuidado que a saúde física.",
                  color: "bg-sky-50",
                  border: "border-sky-200",
                },
                {
                  title: "Nossos Valores",
                  description:
                    "Empatia, precisão, privacidade e inovação centrada no ser humano guiam todas as nossas decisões.",
                  color: "bg-sand-50",
                  border: "border-sand-200",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} rounded-xl p-8 border ${item.border} hover-lift`}
                >
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-foreground/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
                O que dizem os profissionais
              </h2>
              <p className="text-lg text-foreground/80">
                Descubra como o Sereno está transformando a prática de
                profissionais de saúde mental em todo o Brasil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-border shadow-sm hover-lift"
                >
                  <div className="mb-6">{testimonial.avatar}</div>
                  <p className="text-foreground/80 mb-6 italic">
                    `&#34`;{testimonial.quote}`&#34`;
                  </p>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-mint-50 border-y border-mint-100">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
                Pronto para transformar sua prática clínica?
              </h2>
              <p className="text-lg text-foreground/80 mb-10">
                Junte-se a milhares de profissionais que já estão usando o
                Sereno para acompanhar seus pacientes de forma mais eficaz e
                humana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-8 py-6 text-white bg-mint-500 hover:bg-mint-600 rounded-full text-lg">
                  Comece agora
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 border-mint-500 text-mint-700 hover:bg-mint-100 rounded-full text-lg"
                >
                  Agendar demonstração
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
