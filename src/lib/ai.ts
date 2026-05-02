"use server";

import { Groq } from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products, searchProducts } from "./data";
import type { Product, AIChatMessage } from "@/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function processAiQuery(
  query: string,
  history: AIChatMessage[]
): Promise<{
  response: string;
  products?: Product[];
  filters?: { category?: string; maxPrice?: number; minPrice?: number };
}> {
  try {
    // Try Groq first (faster)
    const systemPrompt = `You are MERKAI Assistant, an AI shopping assistant for an Angolan marketplace. 
You help users find products and services. You speak Portuguese (Angolan variant).

Rules:
- Be concise and helpful
- Suggest specific products when relevant
- Ask clarifying questions when needed
- Extract budget constraints if mentioned
- Extract location preferences if mentioned

Available categories: Alimentação, Electrónica, Moda, Casa, Automóvel, Serviços, Saúde, Desporto.

Current products available: ${products.length} items.

When suggesting products, return them in a structured format. If the user mentions a budget, extract the maxPrice. If they mention a category, extract it.`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...history.slice(-5).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: query },
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || "";

    // Extract products from the response or search for them
    let suggestedProducts: Product[] = [];
    const filters: { category?: string; maxPrice?: number; minPrice?: number } = {};

    // Simple extraction logic
    const lowerQuery = query.toLowerCase();

    // Extract budget
    const budgetMatch = lowerQuery.match(/(\d+)[\s]*(?:k|mil|000)?/);
    if (budgetMatch) {
      let price = parseInt(budgetMatch[1]);
      if (lowerQuery.includes("k") || lowerQuery.includes("mil")) {
        price *= 1000;
      }
      filters.maxPrice = price;
    }

    // Extract category
    const categories = ["alimentação", "electrónica", "moda", "casa", "automóvel", "serviços"];
    for (const cat of categories) {
      if (lowerQuery.includes(cat)) {
        filters.category = cat.charAt(0).toUpperCase() + cat.slice(1);
        break;
      }
    }

    // Search for products
    suggestedProducts = searchProducts(query).slice(0, 5);

    // If no products found, try broader search
    if (suggestedProducts.length === 0 && filters.category) {
      suggestedProducts = products
        .filter((p) => p.category === filters.category)
        .slice(0, 5);
    }

    return {
      response,
      products: suggestedProducts.length > 0 ? suggestedProducts : undefined,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    };
  } catch (error) {
    console.error("Groq error, falling back to Gemini:", error);

    // Fallback to Gemini
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(
        `Como assistente do MERKAI (marketplace angolano), responda: ${query}. Seja conciso e útil.`
      );
      return { response: result.response.text() };
    } catch (_geminiError) {
      return {
        response: "Desculpe, estou com dificuldades técnicas. Tente novamente mais tarde.",
      };
    }
  }
}