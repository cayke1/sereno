"use client";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAuth } from "@/lib/contexts/auth-context";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });
  return <LoadingScreen />
}
