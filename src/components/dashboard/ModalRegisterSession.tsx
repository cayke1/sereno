import { therapySessionService } from "@/lib/services/professional/session";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { TimeInput } from "../helpers/InputMask";
import { addMinutes, formatISO, setHours, setMinutes } from "date-fns";

// Componente de datepicker personalizado que não usa Popover

interface ModalRegisterSessionProps {
  professionalPatientId: string;
  widest?: boolean;
}

export function ModalRegisterSession({
  professionalPatientId,
  widest,
}: ModalRegisterSessionProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(0);

  const onSubmit = async () => {
    if (!date) return;

    const [hours, minutes] = startTime.split(":").map(Number);

    let startDate = date;
    startDate = setHours(startDate, hours);
    startDate = setMinutes(startDate, minutes);
    const endDate = addMinutes(startDate, duration);

    const sessionObject = {
      professionalPatientId,
      startDate: formatISO(startDate),
      endDate: formatISO(endDate),
    };
    try {
      const response = await therapySessionService.create(sessionObject);

      if (!response || response instanceof Error) {
        throw new Error("Falha ao registrar sessão");
      }

      toast.success("Sessão agendada com sucesso!");
    } catch (error) {
      console.error(error);
    }

    console.log(sessionObject);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${widest && "justify-start w-full"} text-mint-700 border-mint-200 hover:bg-mint-50`}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Agendar Sessão
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-lg font-semibold">Registrar sessão</h2>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-2 items-start mt-4">
            <h2 className="text-sm font-semibold">Data</h2>
            <DatePicker date={date} setDate={setDate} />
          </div>

          <div className="flex flex-col gap-2 items-start mt-4">
            <h2 className="text-sm font-semibold">Horário de início</h2>
            <div className="w-[52%]">
              <TimeInput
                value={startTime}
                onChange={(value) => setStartTime(value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-start mt-4">
            <h2 className="text-sm font-semibold">
              Duração <span className="text-gray-400">(minutos)</span>
            </h2>
            <div className="w-[52%]">
              <Input
                type="text"
                min={15}
                placeholder="minutos"
                value={duration}
                onChange={(evt) => setDuration(Number(evt.target.value))}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onSubmit}
              className="bg-mint-700 hover:bg-mint-800"
            >
              Agendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
