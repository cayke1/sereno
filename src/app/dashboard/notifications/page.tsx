"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/lib/hooks/notifications/useNotifications";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { useAuth } from "@/lib/contexts/auth-context";

export default function NotificationsPage() {
  const { user } = useAuth();
  const { notifications, loading, markAsRead } = useNotifications(
    user?.id || ""
  );
  const router = useRouter();

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    router.push(notification.url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Notificações
          </h1>
          <div className="text-center py-8">Carregando notificações...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Notificações</h1>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">Nenhuma notificação encontrada</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
