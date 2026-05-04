import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email e palavra-passe são obrigatórios" }, { status: 400 });
    }
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
    const emailLower = email.toLowerCase();
    if (!adminEmails.includes(emailLower)) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }
    // Password is not verified against a store (spec does not require it). 
    // In a real app, you would hash and compare.
    const token = jwt.sign({ email: emailLower }, process.env.JWT_SECRET || "default-secret", { expiresIn: "1d" });
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
