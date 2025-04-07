"use client";
import { useAuth } from "@/lib/contexts/auth-context";
import Link from "next/link";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });
  return (
    <div>
      <h1>Logout</h1>
      <p>You have been logged out.</p>
      <p>Redirecting...</p>
      <p>
        If you are not redirected, click <Link href="/">here</Link>.
      </p>
    </div>
  );
}
