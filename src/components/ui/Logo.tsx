import { Brain } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  href?: string;
}

export function Logo({ size = "md", withText, href }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href={href ? href : "/"}
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <div className="relative">
        <Brain
          className={`${sizeClasses[size]} text-[#25ab8c] animate-pulse-soft`}
          strokeWidth={1.5}
        />
      </div>
      {withText && (
        <span
          className={`font-semibold ${textSizeClasses[size]} gradient-heading`}
        >
          Sereno
        </span>
      )}
    </Link>
  );
}

export default Logo;
