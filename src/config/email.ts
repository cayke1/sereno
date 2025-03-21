export const emailConfig = {
  from: 'Acme <onboarding@resend.dev>',
  to: process.env.EMAIL_TO || "your-email@example.com",
  subject: process.env.EMAIL_SUBJECT || "Your Weekly Feelings Summary",
};