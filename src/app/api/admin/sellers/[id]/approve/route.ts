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

    await db
      .update(sellers)
      .set({
        status: "APPROVED",
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(sellers.id, sellerId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error approving seller:", error);
    return NextResponse.json({ error: "Erro ao aprovar vendedor" }, { status: 500 });
  }
}