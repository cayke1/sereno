import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UseTerms() {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-12 bg-background">
          <div className="container max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">Termos de Uso</h1>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  Última atualização: 10 de Abril de 2025
                </p>
                
                <div className="prose prose-mint max-w-none">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
                  <p className="mb-4">
                    Ao acessar e usar os serviços da Sereno, você concorda em cumprir e ficar vinculado aos seguintes termos e condições. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descrição do Serviço</h2>
                  <p className="mb-4">
                    A Sereno oferece uma plataforma digital para o acompanhamento da saúde mental, permitindo que profissionais monitorem o bem-estar emocional de seus pacientes e que pacientes registrem suas experiências emocionais.
                  </p>
                  <p className="mb-4">
                    Nossos serviços incluem, mas não se limitam a:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Ferramentas para registro de estado emocional</li>
                    <li>Sistema de acompanhamento para profissionais de saúde mental</li>
                    <li>Análise e visualização de dados emocionais</li>
                    <li>Comunicação segura entre pacientes e profissionais</li>
                  </ul>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Registro e Conta</h2>
                  <p className="mb-4">
                    Para utilizar completamente nossos serviços, você precisará criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrem em sua conta.
                  </p>
                  <p className="mb-4">
                    Você concorda em:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Fornecer informações precisas e completas ao se registrar</li>
                    <li>Manter suas informações de registro atualizadas</li>
                    <li>Proteger sua senha e não compartilhá-la com terceiros</li>
                    <li>Notificar imediatamente a Sereno sobre qualquer uso não autorizado de sua conta</li>
                  </ul>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Privacidade</h2>
                  <p className="mb-4">
                    A proteção de seus dados pessoais é extremamente importante para nós. Nossa Política de Privacidade, que é parte integrante destes Termos de Uso, descreve como coletamos, usamos e protegemos suas informações.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Conteúdo do Usuário</h2>
                  <p className="mb-4">
                    Ao submeter conteúdo à plataforma Sereno, você continua a manter todos os direitos sobre esse conteúdo, mas concede à Sereno uma licença para usar, armazenar e processar esse conteúdo para os fins de prestação dos serviços.
                  </p>
                  <p className="mb-4">
                    Você é responsável por todo o conteúdo que submete e garante que possui os direitos necessários para conceder esta licença.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitação de Responsabilidade</h2>
                  <p className="mb-4">
                    A Sereno não é um substituto para aconselhamento médico, diagnóstico ou tratamento profissional. Sempre busque o conselho de seu médico ou outro profissional de saúde qualificado com qualquer dúvida que possa ter sobre uma condição médica.
                  </p>
                  <p className="mb-4">
                    Em nenhuma circunstância a Sereno, seus diretores, funcionários ou afiliados serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da impossibilidade de uso dos nossos serviços.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Modificações dos Termos</h2>
                  <p className="mb-4">
                    A Sereno reserva-se o direito de modificar estes termos a qualquer momento. Ao continuar a usar a plataforma após a publicação de alterações, você aceita e concorda com os termos revisados.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Lei Aplicável</h2>
                  <p className="mb-4">
                    Estes termos serão regidos e interpretados de acordo com as leis brasileiras, sem considerar suas disposições de conflito de leis.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contato</h2>
                  <p className="mb-4">
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail: <a href="mailto:termos@sereno.com.br" className="text-mint-600 hover:text-mint-700">termos@sereno.com.br</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  };
