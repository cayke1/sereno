export const emailConfig = {
  from: process.env.EMAIL_FROM || '"Feelings Tracker" <noreply@feelingstracker.com>',
  to: process.env.EMAIL_TO || "your-email@example.com",
  subject: process.env.EMAIL_SUBJECT || "Your Weekly Feelings Summary",
};