import { prisma } from "@/lib/prisma";
import { responseError } from "@/lib/responseError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return responseError(400, "Missing user id");

  try {
    const sub = await prisma.subscription.findFirst({
      where: {
        professionalId: id,
      },
    });

    if (!sub) return responseError(404, "Subscription not found");

    return NextResponse.json(sub);
  } catch (err: unknown) {
    if (err instanceof Error) return responseError(500, err.message);
    return responseError(500, "Internal server error");
  }
}
