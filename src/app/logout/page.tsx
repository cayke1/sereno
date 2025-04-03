"use client";
import { useAuth } from "@/lib/contexts/auth-context";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });
  return <div>xero sz</div>;
}
