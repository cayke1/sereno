"use client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import Footer from "@/components/layout/Footer";
import { useGetInvite } from "@/lib/hooks/invite/useGetInvite";
import { inviteService } from "@/lib/services/invite";
import { toast } from "sonner";

export default function LinkPage() {
  const router = useRouter();
  const { invite_id } = useParams();

  if (!invite_id) {
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

  const { data: invite, isLoading } = useGetInvite(invite_id!.toString());

  const handleAcceptInvite = async () => {
    if (!invite) return;

    try {
      const res = await inviteService.handleAcceptInvite(invite.id);
      if (!res.success) {
        throw new Error("Erro ao aceitar convite");
      }
      toast.success("Convite aceito com sucesso!", {
        description: "Você será redirecionado para o cadastro.",
      });
    } catch (error) {
      toast.error("Erro ao aceitar convite", {
        description:
          "Não foi possível aceitar o convite. Tente novamente mais tarde.",
      });
    }
    router.push(`/patient/portal`);
  };

  const handleDeclineInvite = async () => {
    if (!invite) return;

    try {
      const res = await inviteService.handleDeclineInvite(invite.id);
      if (!res.success) {
        throw new Error("Erro ao recusar convite");
      }
      toast.success("Convite recusado com sucesso!", {
        description: "Você será redirecionado para a página inicial.",
      });
      router.push("/patient/portal");
    } catch (error) {
      toast.error("Erro ao recusar convite", {
        description:
          "Não foi possível recusar o convite. Tente novamente mais tarde.",
      });
    }
  };

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
            {invite?.professional?.name} <br /> {invite?.professional?.email}
          </span>
        </h2>

        <p className="text-sm font-semibold">
          Note que se já houver alguma ligação será excluída
        </p>

        <div className="flex justify-center items-center gap-8">
          <Button
            onClick={handleDeclineInvite}
            variant="outline"
            className="w-full"
          >
            Não
          </Button>
          <Button
            onClick={handleAcceptInvite}
            className="w-full bg-mint-500 hover:bg-mint-600"
          >
            Sim
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
