export const emailConfig = {
  // SMTP configuration
  smtp: {
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "your-email@example.com",
      pass: process.env.SMTP_PASS || "your-password",
    },
  },
  
  // Email settings
  from: process.env.EMAIL_FROM || '"Feelings Tracker" <noreply@feelingstracker.com>',
  to: process.env.EMAIL_TO || "your-email@example.com",
  subject: process.env.EMAIL_SUBJECT || "Your Weekly Feelings Summary",
  
  // Schedule settings (cron format)
  schedule: process.env.EMAIL_SCHEDULE || "0 19 * * 2", // Tuesday at 7 PM
};