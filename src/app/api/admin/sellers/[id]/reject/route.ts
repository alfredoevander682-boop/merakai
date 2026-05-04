import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sellerId = parseInt(id);

    if (isNaN(sellerId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const reason = body.reason || null;

    await db
      .update(sellers)
      .set({
        status: "REJECTED",
        rejectedReason: reason,
        updatedAt: new Date(),
      })
      .where(eq(sellers.id, sellerId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rejecting seller:", error);
    return NextResponse.json({ error: "Erro ao rejeitar vendedor" }, { status: 500 });
  }
}