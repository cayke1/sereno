import { prisma as db } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Id not defined" }, { status: 400 });
  }
  try {
    const exist = await db.feeling.findUnique({
      where: {
        id: id,
      },
    });
    console.log(exist);
    if (!exist) throw new Error("Not found");

    await db.feeling.delete({ where: { id: id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete feeling" },
      { status: 500 }
    );
  }
}
