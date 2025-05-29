"use client";
import React from "react";
import { NotificationPayload } from "@/@types/notification";
import Link from "next/link";
import { formatTime } from "@/lib/formatTimeNotification";
import { GetNotificationIcon, TYPE_COLORS } from "./GetNotificationIcon";

interface NotificationItemProps {
  notification: NotificationPayload;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const iconColor = TYPE_COLORS[notification.type];

  return (
    <Link
      href={notification.url}
      target="__blank"
      className="flex items-start justify-between w-full"
    >
      <div className="flex-1">
        <div className="flex-shrink-0">
          <GetNotificationIcon
            notificationIcon={notification.icon || "Info"}
            notificationType={notification.type}
            size={20}
            className={`mr-2 ${iconColor} flex-shrink-0`}
          />
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
