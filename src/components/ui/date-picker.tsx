import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-[240px] pl-3 text-left font-normal",
          !date && "text-muted-foreground"
        )}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {date ? (
          format(date, "PPP", { locale: ptBR })
        ) : (
          <span>Escolha uma data</span>
        )}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg z-[9999]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setShowCalendar(false);
            }}
            locale={ptBR}
            initialFocus
          />
        </div>
      )}
    </div>
  );
};
