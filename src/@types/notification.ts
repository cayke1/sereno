export interface NotificationPayload {
  userId: string;
  message: string;
  icon?: string;
  url: string;
  type: "info" | "success" | "error" | "warning";
  timestamp: Date;
  id: string;
  read?: boolean;
}
