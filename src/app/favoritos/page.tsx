"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight, MapPin, Star } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useMerkaiStore } from "@/lib/store";

export default function FavoritosPage() {
  const { favorites, toggleFavorite } = useMerkaiStore();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="merkai-container py-8">
      <h1 className="text-3xl font-bold text-merkai-black mb-2">Favoritos</h1>
      <p className="text-gray-500 mb-8">{favoriteProducts.length} produto{favoriteProducts.length !== 1 ? "s" : ""} guardado{favoriteProducts.length !== 1 ? "s" : ""}</p>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum favorito ainda</h3>
          <p className="text-sm text-gray-400 mb-6">Guarde os produtos que gosta para ver mais tarde.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-merkai-blue text-white rounded-full font-medium hover:bg-merkai-blue-dark transition-colors">
            Explorar Produtos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteProducts.map((product, index) => (
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
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
