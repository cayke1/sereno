import { emailConfig } from "../config/email";
import { Feeling } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {  Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    case "veryBad":
      return "😢";
    case "bad":
      return "😕";
    case "neutral":
      return "😐";
    case "good":
      return "🙂";
    case "veryGood":
      return "😄";
    default:
      return "";
  }
}

function formatMood(mood: string): string {
  switch (mood) {
    case "veryBad":
      return "Very Bad";
    case "bad":
      return "Bad";
    case "neutral":
      return "Neutral";
    case "good":
      return "Good";
    case "veryGood":
      return "Very Good";
    default:
      return mood;
  }
}

export async function sendWeeklyEmail(): Promise<boolean> {
  try {
    // Read feelings data
    const feelingsData = await prisma.feeling.findMany();

    // Get feelings from the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyFeelings = feelingsData.filter((feeling: Feeling) => {
      return new Date(feeling.createdAt) >= oneWeekAgo;
    });

    if (weeklyFeelings.length === 0) {
      console.log("No feelings recorded this week. Skipping email.");
      return false;
    }

    // Generate email content
    let emailContent = `<h1>Your Weekly Feelings Summary</h1>
    <p>Here's a summary of your feelings from the past week:</p>
    <ul>`;

    weeklyFeelings.forEach((feeling: Feeling) => {
      emailContent += `
        <li>
          <strong>${formatDate(feeling.createdAt.toString())}</strong>: 
          ${getMoodEmoji(feeling.mood)} ${formatMood(feeling.mood)} - 
          <em>${feeling.predominant_feeling}</em>
          ${feeling.description ? `<p>${feeling.description}</p>` : ""}
        </li>`;
    });

    emailContent += `</ul>
    <p>Keep tracking your feelings to gain insights into your emotional patterns!</p>`;

    // Send email
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to: [RECIPIENT_EMAIL],
      subject: emailConfig.subject,
      html: emailContent,
    });

    if (error) {
      throw error;
    }

    console.log("Weekly email sent successfully!: ", data);
    return true;
  } catch (error) {
    console.error("Error sending weekly email:", error);
    return false;
  }
}
