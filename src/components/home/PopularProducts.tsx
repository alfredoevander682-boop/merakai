"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, ArrowRight } from "lucide-react";
import { getPopularProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useMerkaiStore } from "@/lib/store";

export function PopularProducts() {
  const popular = getPopularProducts();
  const { toggleFavorite, isFavorite } = useMerkaiStore();

  return (
    <section className="merkai-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="merkai-section-title">Produtos Populares</h2>
        <Link
          href="/produtos"
          className="text-sm font-medium text-merkai-blue hover:text-merkai-blue-dark flex items-center gap-1 transition-colors"
        >
          Ver todos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {popular.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="merkai-card group">
              <Link href={`/produto/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-2xl">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.comparePrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{Math.round((1 - product.price / product.comparePrice) * 100)}%
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
                  <span className="text-lg font-bold text-merkai-blue">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[80px]">{product.store.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>

              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
