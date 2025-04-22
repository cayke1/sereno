"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/auth-context";

export function Header() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();
  const hash = path.includes("#") ? path.substring(path.indexOf("#")) : null;
  const location = {
    pathname: path,
    hash: hash,
  };

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Recursos", href: "/#features" },
    { name: "Sobre", href: "/#about" },
    { name: "Planos", href: "/#pricing" },
  ];

  const href = user
    ? user.role === "PROFESSIONAL"
      ? "/dashboard"
      : "/patient/portal"
    : "/auth/login";

  const isActive = (path: string) => {
    if (path.includes("#")) {
      return (
        location.pathname === "/" &&
        location.hash === path.substring(path.indexOf("#"))
      );
    }
    return location.pathname === path;
  };

  return (
    <header className="py-4 px-4 md:px-6 w-full bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Logo withText size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-mint-600 ${
                    isActive(item.href) ? "text-mint-600" : "text-foreground/80"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link href={href}>
            <Button className="w-full bg-mint-500 hover:bg-mint-600 text-white">
              {href === "/auth/login" && "Login"}
              {href === "/dashboard" && "Dashboard"}
              {href === "/patient/portal" && "Portal"}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden py-4 px-4 absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg animate-fade-in">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-2 text-base font-medium transition-colors hover:text-mint-600 ${
                    isActive(item.href) ? "text-mint-600" : "text-foreground/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href}>
                <Button className="w-full bg-mint-500 hover:bg-mint-600 text-white">
                  {href === "/auth/login" && "Login"}
                  {href === "/dashboard" && "Dashboard"}
                  {href === "/patient/portal" && "Portal"}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
