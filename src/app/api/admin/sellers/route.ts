import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const pendingSellers = await db
      .select({
        id: sellers.id,
        email: sellers.email,
        businessName: sellers.businessName,
        nif: sellers.nif,
        businessType: sellers.businessType,
        phone: sellers.phone,
        city: sellers.city,
        status: sellers.status,
        createdAt: sellers.createdAt,
      })
      .from(sellers)
      .where(eq(sellers.status, "PENDING"));

    return NextResponse.json({ sellers: pendingSellers });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return NextResponse.json({ error: "Erro ao buscar vendedores" }, { status: 500 });
  }
}