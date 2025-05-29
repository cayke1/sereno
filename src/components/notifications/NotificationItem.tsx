"use client";

import React from "react";
import {
  Info,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { NotificationPayload } from "@/@types/notification";
import Link from "next/link";

interface NotificationItemProps {
  notification: NotificationPayload;
}

const ICON_MAP = {
  Info,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
};

const TYPE_COLORS = {
  info: "text-blue-500",
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const IconComponent =
    ICON_MAP[notification.icon as keyof typeof ICON_MAP] || Info;
  const iconColor = TYPE_COLORS[notification.type];

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Agora";
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return time.toLocaleDateString("pt-BR");
  };

  return (
    <Link href={notification.url} target="__blank" className="flex items-start justify-between w-full">
      <div className="flex-1">
        <div className="flex-shrink-0">
          <IconComponent size={20} className={`${iconColor}`}/>
        </div>
        <p
          className={`text-sm ${!notification.read ? "font-medium" : "font-normal"}`}
        >
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatTime(notification.timestamp)}
        </p>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 bg-mint-500 rounded-full ml-2 mt-1 flex-shrink-0" />
      )}
    </Link>
  );
};
