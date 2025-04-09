import { prisma } from "@/lib/prisma";
import { responseError } from "@/lib/responseError";
import { NextRequest, NextResponse } from "next/server";
import { emotion as emotionEnum } from "@/@types/feelings";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { emotion, intensity, trigger, description, userId, createdAt } = body;
  if (!emotion || !intensity || !userId) {
    return responseError(
      400,
      "Missing required fields: emotion, intensity or userId"
    );
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return responseError(404, "User not found");
    }

    if (userExists.role !== "PATIENT") {
      return responseError(403, "User is not a patient");
    }

    const newFeeling = await prisma.feeling.create({
      data: {
        emotion: emotionEnum[emotion as keyof typeof emotionEnum],
        intensity,
        trigger,
        description,
        userId,
        createdAt: createdAt || new Date(),
      },
    });

    return NextResponse.json(newFeeling, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseError(500, error.message);
    }
    return responseError(500, "Internal server error");
  }
}
