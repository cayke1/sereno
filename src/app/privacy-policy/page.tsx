import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12 bg-background">
          <div className="container max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
              Política de Privacidade
            </h1>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  Última atualização: 10 de Abril de 2025
                </p>

                <div className="prose prose-mint max-w-none">
                  <p className="mb-4">
                    A Sereno está comprometida em proteger sua privacidade. Esta
                    Política de Privacidade explica como coletamos, usamos,
                    divulgamos e protegemos suas informações pessoais quando
                    você utiliza nossa plataforma.
                  </p>

                  <h2 className="text-2xl font-semibold text-foreground mb-4 mt-6">
                    1. Informações que Coletamos
                  </h2>
                  <p className="mb-4">
                    Coletamos os seguintes tipos de informações:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>
                      <strong>Informações de registro:</strong> Nome, e-mail,
                      credenciais profissionais (para profissionais de saúde).
                    </li>
                    <li>
                      <strong>Dados de perfil:</strong> Informações
                      demográficas, histórico médico básico (quando fornecido
                      voluntariamente).
                    </li>
                    <li>
                      <strong>Dados de uso:</strong> Registros emocionais, notas
                      de sessão, frequência de uso da plataforma.
                    </li>
                    <li>
                      <strong>Informações técnicas:</strong> Endereço IP, tipo
                      de navegador, dispositivo usado, páginas visitadas.
                    </li>
                  </ul>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    2. Como Usamos Suas Informações
                  </h2>
                  <p className="mb-4">Utilizamos suas informações para:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Fornecer, manter e melhorar nossos serviços</li>
                    <li>Processar e completar transações</li>
                    <li>
                      Enviar informações relacionadas ao serviço, incluindo
                      confirmações, atualizações e alertas
                    </li>
                    <li>Responder a comentários, perguntas e solicitações</li>
                    <li>Desenvolver novos produtos e serviços</li>
                    <li>
                      Monitorar e analisar tendências, uso e atividades
                      relacionadas aos nossos serviços
                    </li>
                  </ul>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    3. Compartilhamento de Informações
                  </h2>
                  <p className="mb-4">
                    Não vendemos ou alugamos suas informações pessoais a
                    terceiros. Compartilhamos suas informações apenas:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Com seu consentimento explícito</li>
                    <li>
                      Entre pacientes e seus profissionais de saúde autorizados
                    </li>
                    <li>
                      Com fornecedores de serviços que precisam acessar as
                      informações para realizar serviços em nosso nome (como
                      processamento de pagamentos, armazenamento de dados)
                    </li>
                    <li>Para cumprir leis, regulamentos ou processos legais</li>
                  </ul>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    4. Segurança de Dados
                  </h2>
                  <p className="mb-4">
                    Implementamos medidas de segurança técnicas, administrativas
                    e físicas para proteger suas informações pessoais contra
                    acesso não autorizado, uso ou divulgação. Estas medidas
                    incluem:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Criptografia de dados em trânsito e em repouso</li>
                    <li>
                      Revisões regulares de segurança e avaliações de
                      vulnerabilidade
                    </li>
                    <li>Controles de acesso para funcionários e contratados</li>
                    <li>
                      Monitoramento contínuo de sistemas para detectar possíveis
                      vulnerabilidades
                    </li>
                  </ul>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    5. Seus Direitos
                  </h2>
                  <p className="mb-4">
                    Você tem certos direitos relacionados às suas informações
                    pessoais:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>
                      Direito de acesso: Você pode solicitar uma cópia das
                      informações que temos sobre você.
                    </li>
                    <li>
                      Direito de retificação: Você pode solicitar a correção de
                      informações imprecisas.
                    </li>
                    <li>
                      Direito à exclusão: Você pode solicitar a exclusão de suas
                      informações em determinadas circunstâncias.
                    </li>
                    <li>
                      Direito à restrição de processamento: Você pode solicitar
                      a limitação do processamento de suas informações.
                    </li>
                    <li>
                      Direito à portabilidade de dados: Você pode solicitar a
                      transferência de suas informações para outro serviço.
                    </li>
                  </ul>
                  <p className="mb-4">
                    Para exercer qualquer um desses direitos, entre em contato
                    conosco através do e-mail{" "}
                    <a
                      href="mailto:privacidade@sereno.com.br"
                      className="text-mint-600 hover:text-mint-700"
                    >
                      privacidade@sereno.com.br
                    </a>
                    .
                  </p>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    6. Cookies e Tecnologias Semelhantes
                  </h2>
                  <p className="mb-4">
                    Utilizamos cookies e tecnologias semelhantes para coletar
                    informações sobre como você interage com nossos serviços e
                    para personalizar sua experiência. Você pode configurar seu
                    navegador para recusar todos os cookies ou para indicar
                    quando um cookie está sendo enviado, mas alguns recursos do
                    site podem não funcionar corretamente sem cookies.
                  </p>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    7. Transferências Internacionais de Dados
                  </h2>
                  <p className="mb-4">
                    Seus dados pessoais podem ser transferidos e processados em
                    países fora do Brasil. Nestes casos, tomaremos medidas para
                    garantir que suas informações recebam um nível de proteção
                    adequado de acordo com esta política e a legislação
                    aplicável.
                  </p>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    8. Alterações a Esta Política
                  </h2>
                  <p className="mb-4">
                    Podemos atualizar esta política periodicamente.
                    Notificaremos você sobre alterações significativas
                    publicando a nova política de privacidade em nosso site e,
                    quando apropriado, através de notificação por e-mail.
                  </p>

                  <Separator className="my-6" />

                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    9. Contato
                  </h2>
                  <p className="mb-4">
                    Se você tiver dúvidas ou preocupações sobre esta Política de
                    Privacidade, entre em contato conosco pelo e-mail:{" "}
                    <a
                      href="mailto:privacidade@sereno.com.br"
                      className="text-mint-600 hover:text-mint-700"
                    >
                      privacidade@sereno.com.br
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
