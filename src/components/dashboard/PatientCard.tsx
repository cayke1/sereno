import { BarChart4, Clock, MessageSquare, SmilePlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import Image from "next/image";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    lastSession: string;
    nextSession: string | null;
    avatar: string;
    emotionScore: number;
    trends: ("up" | "down" | "stable")[];
    status: "active" | "inactive" | "new";
    relationId: string;
  };
}

export function PatientCard({ patient }: PatientCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
            Novo
          </span>
        );
      case "active":
        return (
          <span className="px-2 py-1 bg-mint-100 text-mint-700 text-xs rounded-full">
            Ativo
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            Inativo
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={`/dashboard/patient/${patient.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-mint-100 flex items-center justify-center">
                  <Image
                    src={patient.avatar}
                    width={45}
                    height={45}
                    alt={patient.name}
                    className="rounded-full"
                  />
                </div>
                {patient.status === "new" && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-sky-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{patient.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" /> Última sessão:{" "}
                  {patient.lastSession}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge(patient.status)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-sky-50 border border-sky-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-sky-700">Tendência</span>
                <BarChart4 className="h-4 w-4 text-sky-700" />
              </div>
              <div className="flex gap-1">
                {patient.trends.map((trend, index) => (
                  <span
                    key={index}
                    className="h-5 w-2 rounded-sm bg-sky-200 relative"
                  >
                    {trend === "up" && (
                      <div className="absolute top-0 left-0 right-0 h-3 rounded-sm bg-sky-500" />
                    )}
                    {trend === "down" && (
                      <div className="absolute bottom-0 left-0 right-0 h-3 rounded-sm bg-sky-500" />
                    )}
                    {trend === "stable" && (
                      <div className="absolute top-1 bottom-1 left-0 right-0 rounded-sm bg-sky-500" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-sand-50 border border-sand-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-sand-700">Próxima</span>
                <Clock className="h-4 w-4 text-sand-700" />
              </div>
              <p className="text-sm font-medium truncate">
                {patient.nextSession
                  ? formatDate({ date: patient.nextSession, showHours: true })
                  : "Não agendada"}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex justify-between">
          <Button variant="ghost" size="sm" className="text-sky-600">
            <MessageSquare className="h-4 w-4 mr-1" />
            Mensagem
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-mint-700 border-mint-200"
          >
            <SmilePlus className="h-4 w-4 mr-1" />
            Registrar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default PatientCard;
