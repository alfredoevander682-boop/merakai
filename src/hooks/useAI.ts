"use client";

import { useState, useCallback } from "react";
import { useMerkaiStore } from "@/lib/store";
import { processAiQuery } from "@/lib/ai";
import type { AIChatMessage } from "@/types";

export function useAI() {
  const { aiMessages, addAiMessage } = useMerkaiStore();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: AIChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      addAiMessage(userMessage);
      setIsLoading(true);

      try {
        const result = await processAiQuery(content.trim(), aiMessages);

        const assistantMessage: AIChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
          timestamp: new Date().toISOString(),
          products: result.products,
          filters: result.filters,
        };

        addAiMessage(assistantMessage);
      } catch (_error) {
        const errorMessage: AIChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Desculpe, ocorreu um erro. Tente novamente.",
          timestamp: new Date().toISOString(),
        };
        addAiMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [aiMessages, addAiMessage, isLoading]
  );

  return {
    messages: aiMessages,
    sendMessage,
    isLoading,
  };
}
