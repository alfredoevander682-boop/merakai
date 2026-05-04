import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellers, products } from "@/lib/supabase/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const sellersResult = await db.select({ count: sql<number>`count(*)` }).from(sellers).where(eq(sellers.status, "APPROVED"));
    const productsResult = await db.select({ count: sql<number>`count(*)` }).from(products);
    const pendingResult = await db.select({ count: sql<number>`count(*)` }).from(sellers).where(eq(sellers.status, "PENDING"));

    return NextResponse.json({
      totalUsers: pendingResult[0]?.count || 0,
      totalSellers: sellersResult[0]?.count || 0,
      totalProducts: productsResult[0]?.count || 0,
      totalOrders: 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 });
  }
}