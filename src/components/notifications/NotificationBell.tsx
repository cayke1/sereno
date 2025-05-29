"use client";

import React from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "@/lib/hooks/notifications/useNotifications";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NotificationItem } from "./NotificationItem";
import Link from "next/link";

interface NotificationBellProps {
  userId: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  userId,
}) => {
  const { notifications, loading, markAsRead } = useNotifications(userId);
  const { unreadCount } = useNotifications(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Nenhuma notificação
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-star cursor-pointer"
            >
              <NotificationItem notification={notification} />
            </DropdownMenuItem>
          ))
        )}

        {notifications.length > 0 && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-2 w-full text-center justify-center font-medium text-mint-600"
            >
              Ver todas as notificações
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
