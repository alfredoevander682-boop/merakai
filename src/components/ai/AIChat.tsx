"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  User,
  Sparkles,
  Loader2,
  MapPin,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMerkaiStore } from "@/lib/store";
import { processAiQuery } from "@/lib/ai";
import { formatPrice } from "@/lib/utils";
import type { AIChatMessage } from "@/types";

const quickQuestions = [
  "Quero um telemóvel até 500 mil kwanzas",
  "Onde comprar arroz barato perto de mim?",
  "Preciso de um canalizador urgente",
  "Sofás modernos em Luanda",
];

export function AIChat() {
  const { isAiChatOpen, toggleAiChat, aiMessages, addAiMessage } = useMerkaiStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isAiChatOpen]);

  useEffect(() => {
    if (isAiChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isAiChatOpen]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    addAiMessage(userMessage);
    setInput("");
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleAiChat}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isAiChatOpen
            ? "bg-gray-900 text-white rotate-0"
            : "bg-merkai-blue text-white hover:bg-merkai-blue-dark hover:scale-110"
        }`}
      >
        {isAiChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isAiChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-140px)] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-merkai-blue to-merkai-blue-light p-4 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistente MERKAI</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Online — Powered by AI
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {aiMessages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-merkai-blue/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-merkai-blue" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-700 max-w-[85%]">
                      <p className="mb-2">Olá! Sou o assistente do MERKAI. 🛍️</p>
                      <p>Posso ajudar a:</p>
                      <ul className="mt-1 space-y-1 text-gray-600">
                        <li>• Encontrar produtos por preço</li>
                        <li>• Sugerir com base no seu orçamento</li>
                        <li>• Encontrar lojas perto de si</li>
                        <li>• Comparar preços</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pl-11">
                    <p className="text-xs text-gray-400 mb-2">Perguntas rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-merkai-blue/10 hover:text-merkai-blue rounded-full text-xs text-gray-600 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {aiMessages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user"
                          ? "bg-gray-900"
                          : "bg-merkai-blue/10"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-merkai-blue" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm max-w-[85%] ${
                        message.role === "user"
                          ? "bg-merkai-blue text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-700 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>

                  {/* Product Suggestions */}
                  {message.products && message.products.length > 0 && (
                    <div className="pl-11 grid gap-2">
                      {message.products.map((product) => (
                        <Link key={product.id} href={`/produto/${product.id}`}>
                          <div className="flex gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-merkai-blue/30 hover:shadow-sm transition-all cursor-pointer">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-merkai-black line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-sm font-bold text-merkai-blue">
                                {formatPrice(product.price)}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <span className="flex items-center gap-0.5">
                                  <MapPin className="w-3 h-3" />
                                  {product.store.name}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Tag className="w-3 h-3" />
                                  {product.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-merkai-blue/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-merkai-blue" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-merkai-blue" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-gray-100 shrink-0"
            >
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre produtos..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-full bg-merkai-blue text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-merkai-blue-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
