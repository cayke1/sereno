"use client";
import { Search, UserMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { formatDate } from "@/lib/formatDate";
import {
  ResponseGetAllPatients,
  useGetPatients,
} from "@/lib/hooks/professional-report/useGetPatients";
import { professionalPatientService } from "@/lib/services/professional/patient";

export function PatientManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetPatients();
  const [patients, setPatients] = useState<ResponseGetAllPatients[] | null>();

  useEffect(() => {
    if (isLoading) return;
    if (!data) return;
    setPatients(data);
  }, [isLoading, data]);

  const [patientToRemove, setPatientToRemove] =
    useState<ResponseGetAllPatients | null>(null);

  const handleRemovePatient = async () => {
    if (patientToRemove) {
      const removePatientRequest =
        await professionalPatientService.unlinkPatient(patientToRemove.email);
      if (removePatientRequest.message) {
        toast.success("Paciente removido", {
          description: `${patientToRemove.name} foi removido da sua lista de pacientes.`,
        });
      }
      setPatientToRemove(null);
    }
  };

  const filteredPatients =
    patients &&
    patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Gerenciar Pacientes</h2>

      <div className="flex items-center mb-6 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar pacientes..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">
                Data de cadastro
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients && filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum paciente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients &&
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {patient.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {formatDate({ date: patient.createdAt, showHours: false })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setPatientToRemove(patient)}
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Remover</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!patientToRemove}
        onOpenChange={(open) => !open && setPatientToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover acesso do paciente</AlertDialogTitle>
            <AlertDialogDescription>
              {patientToRemove && (
                <>
                  Esta ação removerá {patientToRemove.name} da sua lista de
                  pacientes. Eles não terão mais acesso à plataforma através do
                  seu perfil profissional. Esta ação não pode ser desfeita.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemovePatient}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, remover paciente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
