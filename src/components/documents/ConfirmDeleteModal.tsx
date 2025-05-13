import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ConfirmDeleteProps {
  doc_id: string;
  handleDelete: (id: string) => void;
}

export function ConfirmDeleteModal({ doc_id, handleDelete }: ConfirmDeleteProps) {
    const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <a className="text-red-600 hover:text-red-800" onClick={() => setOpen(true)}>Excluir</a>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <h2 className="text-lg font-bold">Excluir Documento</h2>
          <p className="text-sm text-muted-foreground">
            Você tem certeza que deseja excluir este documento? Esta ação não
            pode ser desfeita.
          </p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(doc_id)}
            >
              Excluir
            </button>
            <button
              className="bg-mint-400 text-white px-4 py-2 rounded"
              onClick={() => {setOpen(false)}}
            >
              Cancelar
            </button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
