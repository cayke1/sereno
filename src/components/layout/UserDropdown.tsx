import { File, LogOut, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:border-l hover:border-mint-500 transition-all">
          <Link href="/dashboard/documents" className="flex items-center gap-2">
            <File size={16} />
            Documentos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:border-l hover:border-mint-500 transition-all">
          <Link href="/dashboard/settings" className="flex items-center gap-2">
            <Settings size={16} />
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:border-l hover:border-red-600 transition-all">
          <Link href="/logout" className="flex items-center gap-2 text-red-600">
            <LogOut size={16} className="text-inherit" />
            Sair
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
