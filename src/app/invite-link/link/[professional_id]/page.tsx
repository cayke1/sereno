"use client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetUser } from "@/lib/hooks/user/useGetUser";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import Footer from "@/components/layout/Footer";

export default function LinkPage() {
  const { professional_id } = useParams();

  if (!professional_id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">
          ID do profissional não encontrado
        </h1>
        <Link href="/" className="mt-4 text-mint-500 hover:text-mint-700">
          Página inicial
        </Link>
      </div>
    );
  }

  const {
    data: user,
    isLoading,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useGetUser(professional_id?.toString());

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="w-full h-screen flex flex-col justify-between">
      <div
        className="mt-8 mx-auto flex flex-col 
    items-center justify-center px-4 py-12 bg-white 
    rounded-lg shadow-md p-6 md:p-8 border border-border gap-4"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 gradient-heading">
          Deseja mesmo se atrelar ao profissional? <br />
          <span className="bg-slate-200 text-sm text-slate-400 p-1">
            {user?.name} <br /> {user?.email}
          </span>
        </h2>

        <p className="text-sm font-semibold">
          Note que se já houver alguma ligação será excluída
        </p>

        <div className="flex justify-center items-center gap-8">
          <Button variant="outline" className="w-full">
            Não
          </Button>
          <Button className="w-full bg-mint-500 hover:bg-mint-600">Sim</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
