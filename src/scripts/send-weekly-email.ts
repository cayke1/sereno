import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import cron from "node-cron";
import { emailConfig } from "../config/email";
import { Feeling } from "@/@types/feelings";

const DATA_FILE = path.join(process.cwd(), "data", "feelings.json");

// Configure email transporter
const transporter = nodemailer.createTransport(emailConfig.smtp);

// Email recipient
const RECIPIENT_EMAIL = emailConfig.to;

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getMoodEmoji(mood: string): string {
  switch (mood) {
    case "veryBad": return "😢";
    case "bad": return "😕";
    case "neutral": return "😐";
    case "good": return "🙂";
    case "veryGood": return "😄";
    default: return "";
  }
}

function formatMood(mood: string): string {
  switch (mood) {
    case "veryBad": return "Very Bad";
    case "bad": return "Bad";
    case "neutral": return "Neutral";
    case "good": return "Good";
    case "veryGood": return "Very Good";
    default: return mood;
  }
}

async function sendWeeklyEmail() {
  try {
    // Read feelings data
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    
    // Get feelings from the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyFeelings = data.filter((feeling: Feeling) => {
      return new Date(feeling.timestamp) >= oneWeekAgo;
    });
    
    if (weeklyFeelings.length === 0) {
      console.log("No feelings recorded this week. Skipping email.");
      return;
    }
    
    // Generate email content
    let emailContent = `<h1>Your Weekly Feelings Summary</h1>
    <p>Here's a summary of your feelings from the past week:</p>
    <ul>`;
    
    weeklyFeelings.forEach((feeling: Feeling) => {
      emailContent += `
        <li>
          <strong>${formatDate(feeling.timestamp)}</strong>: 
          ${getMoodEmoji(feeling.mood)} ${formatMood(feeling.mood)} - 
          <em>${feeling.predominantFeeling}</em>
          ${feeling.description ? `<p>${feeling.description}</p>` : ""}
        </li>`;
    });
    
    emailContent += `</ul>
    <p>Keep tracking your feelings to gain insights into your emotional patterns!</p>`;
    
    // Send email
    await transporter.sendMail({
      from: '"Feelings Tracker" <noreply@feelingstracker.com>',
      to: RECIPIENT_EMAIL,
      subject: "Your Weekly Feelings Summary",
      html: emailContent,
    });
    
    console.log("Weekly email sent successfully!");
  } catch (error) {
    console.error("Error sending weekly email:", error);
  }
}

// Schedule to run based on config
cron.schedule(emailConfig.schedule, sendWeeklyEmail);

console.log(`Weekly email scheduler started. Will send emails according to schedule: ${emailConfig.schedule}`);

// If you want to run the script directly for testing
if (process.argv.includes("--send-now")) {
  sendWeeklyEmail().then(() => {
    console.log("Test email sent!");
    process.exit(0);
  });
}