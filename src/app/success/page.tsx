import Footer from "@/components/layout/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gradient-to-br from-mint-50 to-sky-50">
        <Card className="max-w-md w-full mx-auto border-mint-200 shadow-lg">
          <CardContent className="pt-6 pb-4 px-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-mint-100 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-mint-600" />
            </div>

            <h1 className="text-2xl font-bold mb-2 gradient-heading">
              Pagamento Concluído!
            </h1>

            <p className="text-muted-foreground mb-4">
              Obrigado por escolher a Sereno. Seu plano foi ativado com sucesso!
            </p>

            <Alert className="bg-mint-50 border-mint-200 mb-4">
              <AlertDescription>
                Um email de confirmação foi enviado para o seu endereço de email
                com os detalhes da sua compra.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <Button
              asChild
              className="w-full sm:w-auto bg-mint-500 hover:bg-mint-600"
            >
              <Link href="/dashboard">Acessar Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/patient-portal">Portal do Paciente</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
