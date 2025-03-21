import { Feeling } from "@/@types/feelings";
import { prisma as db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.mood || !data.predominant_feeling) {
      return NextResponse.json(
        { error: "Mood and predominant feeling are required" },
        { status: 400 }
      );
    }

    // Add timestamp
    const feeling: Feeling = {
      ...data,
    };

    const newFeeling = await db.feeling.create({
      data: feeling,
    });

    return NextResponse.json({ success: true, feeling: newFeeling });
  } catch (error) {
    console.log(error);
    console.error("Error saving feeling:", error);
    return NextResponse.json(
      { error: "Failed to save feeling" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db.feeling.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading feelings:", error);
    return NextResponse.json(
      { error: "Failed to read feelings" },
      { status: 500 }
    );
  }
}
