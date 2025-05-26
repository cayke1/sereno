import { prisma } from "@/lib/prisma";
import { responseError } from "@/lib/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return responseError(400, "Missing invite ID");
  }

  try {
    const invite = await prisma.invite.findUnique({
      where: {
        id,
      },
      include: {
        professional: true,
      },
    });

    return NextResponse.json(invite);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseError(500, error.message);
    }

    return responseError(500, "Internal server error");
  }
}
