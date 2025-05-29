import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

export const ICON_MAP = {
  Info,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
};

export const TYPE_COLORS = {
  info: "text-blue-500",
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
};

interface GetNotificationIconProps {
  notificationIcon: string;
  notificationType: "info" | "success" | "error" | "warning";
  size: number;
  className: string;
}

export function GetNotificationIcon({
  notificationIcon,
  notificationType,
  size,
  className,
}: GetNotificationIconProps) {
  const IconComponent =
    ICON_MAP[notificationIcon as keyof typeof ICON_MAP] || Info;
  const iconColor = TYPE_COLORS[notificationType];

  return <IconComponent size={size} className={`${iconColor} ${className}`} />;
}
