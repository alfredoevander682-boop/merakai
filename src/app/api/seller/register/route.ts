import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, businessName, nif, businessType, phone, city } = await request.json();

    if (!email || !password || !businessName || !nif || !businessType || !phone || !city) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const [existing] = await db
      .select()
      .from(sellers)
      .where(eq(sellers.email, email.toLowerCase()))
      .limit(1);

    if (existing) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newSeller] = await db
      .insert(sellers)
      .values({
        email: email.toLowerCase(),
        password: hashedPassword,
        businessName,
        nif,
        businessType,
        phone,
        city,
        status: "PENDING",
      })
      .returning();

    return NextResponse.json({ success: true, seller: { id: newSeller.id, email: newSeller.email } });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Erro ao registrar" }, { status: 500 });
  }
}