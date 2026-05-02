"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useMerkaiStore } from "@/lib/store";
import type { Category, Product } from "@/types";

export function CategoryContent({ category, products }: { category: Category; products: Product[] }) {
  const { toggleFavorite, isFavorite } = useMerkaiStore();

  return (
    <div className="merkai-container py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-merkai-blue transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: category.color }}>
          <span className="text-xl font-bold">{category.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-merkai-black">{category.name}</h1>
          <p className="text-sm text-gray-500">{products.length} produtos disponíveis</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {products.map((product, index) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <div className="merkai-card group">
              <Link href={`/produto/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-2xl">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/produto/${product.id}`}>
                  <h3 className="font-medium text-sm text-merkai-black mb-1 line-clamp-2 group-hover:text-merkai-blue transition-colors">{product.name}</h3>
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
              <button onClick={() => toggleFavorite(product.id)} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors">
                <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">Nenhum produto nesta categoria ainda.</p>
        </div>
      )}
    </div>
  );
}
