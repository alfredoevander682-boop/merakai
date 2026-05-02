"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, TrendingUp } from "lucide-react";
import { quickSearches } from "@/lib/data";
import { useMerkaiStore } from "@/lib/store";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addRecentSearch } = useMerkaiStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query.trim());
      window.location.href = `/pesquisa?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleQuickSearch = (term: string) => {
    addRecentSearch(term);
    window.location.href = `/pesquisa?q=${encodeURIComponent(term)}`;
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-merkai-blue/5 to-transparent pointer-events-none" />

      <div className="merkai-container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-6xl font-bold tracking-tight text-merkai-black mb-4"
          >
            Encontre o que precisa em{" "}
            <span className="text-merkai-blue">Angola</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-500 mb-10"
          >
            Produtos, serviços e lojas perto de si. Sem conta, sem complicação.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <form onSubmit={handleSearch} className="relative">
              <div
                className={`
                  relative flex items-center bg-white rounded-full shadow-soft
                  border transition-all duration-300
                  ${isFocused ? "border-merkai-blue ring-4 ring-merkai-blue/10" : "border-gray-200"}
                `}
              >
                <div className="pl-6 pr-2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder="Pesquisar produtos ou serviços..."
                  className="flex-1 py-4 text-lg outline-none bg-transparent placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="mr-2 px-6 py-2.5 bg-merkai-blue text-white rounded-full font-medium hover:bg-merkai-blue-dark transition-colors flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Pesquisar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Location pill */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                <span>Luanda</span>
              </button>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
                Tendência: iPhone 16, Arroz, Sofá
              </span>
            </div>
          </motion.div>

          {/* Quick Searches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <p className="text-sm text-gray-500 mb-3">Pesquisas populares</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-merkai-blue hover:text-merkai-blue transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
