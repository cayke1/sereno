"use client"
import { Search, UserMinus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";


interface Patient {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive';
    joinDate: Date;
    lastActivity: Date;
  }
export function PatientManagement() {
    const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@exemplo.com',
      status: 'active',
      joinDate: new Date('2024-03-15'),
      lastActivity: new Date('2024-04-08')
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@exemplo.com',
      status: 'active',
      joinDate: new Date('2024-01-22'),
      lastActivity: new Date('2024-04-10')
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@exemplo.com',
      status: 'active',
      joinDate: new Date('2023-11-05'),
      lastActivity: new Date('2024-04-05')
    },
    {
      id: '4',
      name: 'Carolina Mendes',
      email: 'carolina.mendes@exemplo.com',
      status: 'inactive',
      joinDate: new Date('2023-08-17'),
      lastActivity: new Date('2024-03-01')
    },
    {
      id: '5',
      name: 'Bruno Costa',
      email: 'bruno.costa@exemplo.com',
      status: 'active',
      joinDate: new Date('2024-02-28'),
      lastActivity: new Date('2024-04-09')
    },
  ]);
  
  const [patientToRemove, setPatientToRemove] = useState<Patient | null>(null);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const handleRemovePatient = () => {
    if (patientToRemove) {
      // In a real app, this would call your backend to remove access
      setPatients(patients.filter(patient => patient.id !== patientToRemove.id));
      toast.success( "Paciente removido",{
        description: `${patientToRemove.name} foi removido da sua lista de pacientes.`,
      });
      setPatientToRemove(null);
    }
  };
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => {
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
              <TableHead className="hidden lg:table-cell">Data de cadastro</TableHead>
              <TableHead className="hidden lg:table-cell">Última atividade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum paciente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{patient.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{formatDate(patient.joinDate)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{formatDate(patient.lastActivity)}</TableCell>
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
      
      <AlertDialog open={!!patientToRemove} onOpenChange={(open) => !open && setPatientToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover acesso do paciente</AlertDialogTitle>
            <AlertDialogDescription>
              {patientToRemove && (
                <>
                  Esta ação removerá {patientToRemove.name} da sua lista de pacientes. 
                  Eles não terão mais acesso à plataforma através do seu perfil profissional.
                  Esta ação não pode ser desfeita.
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