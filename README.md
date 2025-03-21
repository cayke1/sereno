# Feelings Tracker

A mobile-first web application that allows you to track your daily feelings and emotions. The app sends a weekly summary email every Tuesday at 7 PM.

## Features

- Record daily feelings with mood, predominant feeling, and optional description
- Mobile-first responsive design
- View history of recorded feelings
- Weekly email summary sent every Tuesday at 7 PM

## Getting Started

1. Clone the repository
2. Install dependencies:
3. Configure your email settings in `env.local` file
4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser
## Email Configuration
To configure the email functionality, create a `.env.local` file with the following variables:
# SMTP Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER= your-email@example.com SMTP_PASS=your-password

# Email Settings
EMAIL_FROM="Feelings Tracker noreply@feelingstracker.com "
EMAIL_TO= your-email@example.com EMAIL_SUBJECT=Your Weekly Feelings Summary

# Schedule (Tuesday at 7 PM)
EMAIL_SCHEDULE=0 19 * * 2

## Running the Email Scheduler
To start the email scheduler:
```bash
npm run start-scheduler
```
To send a test email immediately:
```bash
npm run send-email-now
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Node-cron
- Nodemailer