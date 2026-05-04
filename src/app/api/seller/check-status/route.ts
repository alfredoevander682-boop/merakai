import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sellerId = cookieHeader?.match(/seller-token=([^;]+)/)?.[1];

    if (!sellerId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const id = parseInt(sellerId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const [seller] = await db
      .select({
        id: sellers.id,
        email: sellers.email,
        businessName: sellers.businessName,
        status: sellers.status,
      })
      .from(sellers)
      .where(eq(sellers.id, id))
      .limit(1);

    if (!seller) {
      return NextResponse.json({ error: "Vendedor não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ status: seller.status, seller });
  } catch (error) {
    console.error("Check status error:", error);
    return NextResponse.json({ error: "Erro ao verificar status" }, { status: 500 });
  }
}