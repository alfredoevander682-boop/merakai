"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  MapPin,
  Heart,
  Flame,
  X,
} from "lucide-react";
import { searchProducts, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useMerkaiStore } from "@/lib/store";

function SearchSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card space-y-4">
          <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-10 bg-gray-100 rounded-full mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(searchProducts(initialQuery));
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toggleFavorite, isFavorite } = useMerkaiStore();

  useEffect(() => {
    let filtered = searchProducts(query);

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setResults(filtered);
  }, [query, selectedCategory, priceRange, sortBy]);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtros
      </button>

      <AnimatePresence>
        {showFilters && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:hidden w-full space-y-6"
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filtros</h3>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setPriceRange([0, 5000000]);
                    setSortBy("relevance");
                  }}
                  className="text-xs text-merkai-blue hover:underline"
                >
                  Limpar
                </button>
              </div>
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2">Categoria</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-merkai-blue/10 text-merkai-blue font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2">Preço</h4>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-merkai-blue"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Ordenar</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm outline-none border border-gray-200 focus:border-merkai-blue"
                >
                  <option value="relevance">Relevância</option>
                  <option value="price-asc">Preço: Baixo → Alto</option>
                  <option value="price-desc">Preço: Alto → Baixo</option>
                  <option value="rating">Melhor Avaliado</option>
                </select>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - always visible */}
      <aside className="hidden lg:block w-64 shrink-0 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filtros</h3>
            <button
              onClick={() => {
                setSelectedCategory("");
                setPriceRange([0, 5000000]);
                setSortBy("relevance");
              }}
              className="text-xs text-merkai-blue hover:underline"
            >
              Limpar
            </button>
          </div>
          <div className="mb-5">
            <h4 className="text-sm font-medium mb-2">Categoria</h4>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-merkai-blue/10 text-merkai-blue font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h4 className="text-sm font-medium mb-2">Preço</h4>
            <input
              type="range"
              min="0"
              max="5000000"
              step="50000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-merkai-blue"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Ordenar</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm outline-none border border-gray-200 focus:border-merkai-blue"
            >
              <option value="relevance">Relevância</option>
              <option value="price-asc">Preço: Baixo → Alto</option>
              <option value="price-desc">Preço: Alto → Baixo</option>
              <option value="rating">Melhor Avaliado</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-full transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-full transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {results.length} resultado{results.length !== 1 ? "s" : ""}
          {query && ` para "${query}"`}
        </p>

        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <div className="merkai-card group">
                  <Link href={`/produto/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-2xl">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.sponsored && (
                        <div className="absolute top-3 left-3">
                          <span className="merkai-badge-sponsored text-xs">
                            <Flame className="w-3 h-3 mr-1" />
                            Patrocinado
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-3">
                    <Link href={`/produto/${product.id}`}>
                      <h3 className="font-medium text-sm text-merkai-black mb-1 line-clamp-2 group-hover:text-merkai-blue transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-lg font-bold text-merkai-blue">{formatPrice(product.price)}</span>
                      {product.comparePrice && <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{product.store.name}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{product.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-3">
            {results.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                <Link href={`/produto/${product.id}`}>
                  <div className="merkai-card group flex gap-4 p-3 cursor-pointer">
                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-merkai-black group-hover:text-merkai-blue transition-colors line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{product.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-lg font-bold text-merkai-blue">{formatPrice(product.price)}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{product.store.name}</span>
                        <span className="text-xs flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{product.rating}</span>
                      </div>
                    </div>
                    {product.sponsored && (
                      <span className="shrink-0 merkai-badge-sponsored self-start">
                        <Flame className="w-3 h-3 mr-1" />
                        Patrocinado
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-sm text-gray-400">Tente pesquisar com termos diferentes ou verifique os filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchResults() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}