import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reviews, products } from "@/lib/supabase/schema";
import { eq, and, asc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId é obrigatório" }, { status: 400 });
  }

  const parsedId = parseInt(productId);
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "productId inválido" }, { status: 400 });
  }

  try {
    const productReviews = await db
      .select({
        id: reviews.id,
        name: reviews.name,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(eq(reviews.productId, parsedId))
      .orderBy(asc(reviews.createdAt));

    const avgResult = await db
      .select({ rating: reviews.rating })
      .from(reviews)
      .where(eq(reviews.productId, parsedId));

    const avgRating = avgResult.length > 0
      ? avgResult.reduce((sum, r) => sum + r.rating, 0) / avgResult.length
      : 0;

    return NextResponse.json({
      reviews: productReviews,
      avgRating,
      total: productReviews.length,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Erro ao buscar avaliações" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, name, email, rating, comment } = body;

    if (!productId || !name || !email || !rating) {
      return NextResponse.json(
        { error: "Campos obrigatórios: productId, name, email, rating" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json({ error: "Rating deve ser um número inteiro entre 1 e 5" }, { status: 400 });
    }

    const parsedId = parseInt(productId);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "productId inválido" }, { status: 400 });
    }

    const existingReview = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.productId, parsedId),
          eq(reviews.email, email.toLowerCase())
        )
      )
      .limit(1);

    if (existingReview.length > 0) {
      return NextResponse.json(
        { error: "Você já avaliou este produto" },
        { status: 409 }
      );
    }

    await db.insert(reviews).values({
      productId: parsedId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      rating,
      comment: comment?.trim() || null,
    });

    const reviewCountResult = await db
      .select({ rating: reviews.rating })
      .from(reviews)
      .where(eq(reviews.productId, parsedId));

    const newAvgRating = reviewCountResult.reduce((sum, r) => sum + r.rating, 0) / reviewCountResult.length;
    const newReviewCount = reviewCountResult.length;

    await db
      .update(products)
      .set({
        rating: newAvgRating,
        reviewCount: newReviewCount,
      })
      .where(eq(products.id, parsedId));

    return NextResponse.json({ success: true, message: "Avaliação enviada com sucesso" });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 500 });
  }
}