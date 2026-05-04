import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha obrigatórios" }, { status: 400 });
    }

    const [seller] = await db
      .select()
      .from(sellers)
      .where(eq(sellers.email, email.toLowerCase()))
      .limit(1);

    if (!seller) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, seller.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    if (seller.status === "PENDING") {
      return NextResponse.json({ error: "Aguarde aprovação da equipe MERKAI" }, { status: 403 });
    }

    if (seller.status === "REJECTED") {
      return NextResponse.json({ error: "Sua solicitação foi rejeitada. Contacte o suporte." }, { status: 403 });
    }

    const response = NextResponse.json({ success: true, seller: { id: seller.id, email: seller.email, businessName: seller.businessName } });
    
    response.cookies.set("seller-token", String(seller.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}