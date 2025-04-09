import { prisma } from "@/lib/prisma";
import { responseError } from "@/lib/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return responseError(400, "Missing user ID");
  }

  try {
    const feelings = await prisma.feeling.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feelings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseError(500, error.message);
    }

    return responseError(500, "Internal server error");
  }
}
