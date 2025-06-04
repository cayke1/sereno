"use client";
import React, { useState } from "react";
import { Bell, Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/auth-context";
import { NotificationBell } from "../notifications/NotificationBell";
import { UserDropdown } from "./UserDropdown";
import { Badge } from "../ui/badge";
import { useNotifications } from "@/lib/hooks/notifications/useNotifications";

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { unreadCount } = useNotifications(user?.id || "");

  let customNavItems: { name: string; href: string }[] = [
    {
      name: "Início",
      href: "/",
    },
  ];

  if (user) {
    if (user.role === "PATIENT") {
      customNavItems = [
        {
          name: "Início",
          href: "/patient/portal",
        },
      ];
    } else {
      customNavItems = [
        {
          name: "Início",
          href: "/dashboard",
        },
      ];
    }
  }

  return (
    <header className="py-4 px-4 md:px-6 w-full bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Logo withText size="md" href={customNavItems[0].href} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8">
            <NotificationBell userId={user?.id || ""} />
            <UserDropdown />
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden min-w-60 py-4 px-4 absolute top-16 right-0 bg-white border-b border-border shadow-lg animate-fade-in">
          <li className="flex flex-col space-y-4">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link
                href="/dashboard/notifications"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bell size={16} />
                <span>Notificações</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link
                href="/dashboard/settings"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={16} />
                <span>Configurações</span>
              </Link>
            </Button>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">
                Notificações não lidas
              </span>
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount}</Badge>
              )}
            </div>
          </li>
        </nav>
      )}
    </header>
  );
}
