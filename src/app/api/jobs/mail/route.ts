import { sendWeeklyEmail } from "@/scripts/send-weekly-email";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mail = await sendWeeklyEmail();
    if (!mail)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
