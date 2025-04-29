import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateVerbose(date: string | Date) {
  try {
    if (!date) return "";
    return format(date, "'Dia' dd 'de' MMMM, HH:mm", { locale: ptBR });
  } catch (err) {
    console.log(err);
    console.log(date);
    throw err;
  }
}
