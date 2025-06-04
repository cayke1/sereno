"use client";
import React, { useState } from "react";
import { Bell, Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Footer from "@/components/layout/Footer";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { GetNotificationIcon } from "@/components/notifications/GetNotificationIcon";
import { useNotifications } from "@/lib/hooks/notifications/useNotifications";
import { useAuth } from "@/lib/contexts/auth-context";
import { formatTime } from "@/lib/formatTimeNotification";
import Link from "next/link";

export default function Notifications() {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications(
    user?.id || ""
  );
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter(
    (notification) => filter === "all" || !notification.read
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Header Section */}
          <div className="lg:w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                  <Bell className="h-8 w-8 text-mint-600" />
                  Notificações
                </h1>
                <p className="text-gray-600 mt-1">
                  Gerencie suas notificações e alertas
                </p>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilter("all")}>
                      Todas
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("unread")}>
                      Não lidas
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md text-gray-600">Total</p>
                      <p className="text-2xl font-bold">
                        {notifications.length}
                      </p>
                    </div>
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md text-gray-600">Não lidas</p>
                      <p className="text-2xl font-bold text-mint-600">
                        {unreadCount}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-mint-100 text-mint-800"
                    >
                      {unreadCount}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md text-gray-600">Lidas hoje</p>
                      <p className="text-2xl font-bold">
                        {notifications.length - unreadCount}
                      </p>
                    </div>
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {filter === "all"
                      ? "Todas as notificações"
                      : "Notificações não lidas"}
                  </span>
                  <Badge variant="outline">
                    {filteredNotifications.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">
                      Nenhuma notificação
                    </p>
                    <p>Você está em dia com suas notificações!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-mint-25" : ""
                        }`}
                      >
                        <Link
                          href={notification.url}
                          target="__blank"
                          className="flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div className="text-2xl">
                              <GetNotificationIcon
                                notificationIcon={
                                  notification.type.charAt(0).toUpperCase() +
                                  notification.type.slice(1)
                                }
                                notificationType={notification.type}
                                size={24}
                                className={`text-${notification.type}-600 flex-shrink-0`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-mint-500 rounded-full flex-shrink-0" />
                                )}
                                <h3
                                  className={`font-medium ${
                                    !notification.read
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.message}
                                </h3>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {formatTime(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-mint-600 hover:text-mint-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}

                            {/* <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
