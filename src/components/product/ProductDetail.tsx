"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Navigation,
  Star,
  Heart,
  Share2,
  Store,
  Check,
  MessageCircle,
} from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useMerkaiStore } from "@/lib/store";
import { ProductReviews } from "./ProductReviews";
import type { Product } from "@/types";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { toggleFavorite, isFavorite } = useMerkaiStore();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const priceComparison = products
    .filter((p) => p.name.toLowerCase().includes(product.name.split(" ")[0].toLowerCase()) && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="merkai-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left - Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.sponsored && (
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                  Patrocinado
                </span>
              )}
              {!product.inStock && (
                <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
                  Esgotado
                </span>
              )}
            </div>
          </motion.div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border-2 transition-colors ${
                    selectedImage === i ? "border-merkai-blue" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-merkai-black">
                {product.name}
              </h1>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="p-3 rounded-full bg-gray-100 hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} avaliações)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl lg:text-4xl font-bold text-merkai-blue">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            {product.comparePrice && (
              <p className="text-sm text-green-600 font-medium mt-1">
                Poupa {formatPrice(product.comparePrice - product.price)}
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className={product.inStock ? "text-green-600" : "text-red-600"}>
              {product.inStock ? "Em stock" : "Esgotado"}
            </span>
          </div>

          {/* Store Info */}
          <Link href={`/loja/${product.store.slug}`}>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-merkai-blue/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-merkai-blue" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-merkai-black">{product.store.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {product.store.address}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{product.store.rating}</span>
                </div>
                {product.store.isVerified && (
                  <span className="text-xs text-green-600 flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                    Verificado
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${product.store.coordinates.lat},${product.store.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-merkai-blue text-white rounded-2xl font-medium hover:bg-merkai-blue-dark transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Como Chegar
            </a>
            <a
              href={`tel:${product.store.phone}`}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-merkai-black rounded-2xl font-medium hover:bg-gray-200 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Contactar
            </a>
          </div>

          {product.store.whatsapp && (
            <a
              href={`https://wa.me/${product.store.whatsapp.replace("+", "").replace(/ /g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-500 text-white rounded-2xl font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          )}

          <div>
            <h3 className="font-semibold text-merkai-black mb-2">Descrição</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      {priceComparison.length > 0 && (
        <div className="mt-16">
          <h2 className="merkai-section-title mb-6">Comparação de Preços</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-6 bg-merkai-blue/5">
                <p className="text-sm text-gray-500 mb-1">Este produto</p>
                <p className="text-xl font-bold text-merkai-blue">{formatPrice(product.price)}</p>
                <p className="text-sm text-gray-600 mt-1">{product.store.name}</p>
              </div>
              {priceComparison.map((p) => (
                <Link key={p.id} href={`/produto/${p.id}`}>
                  <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-500 mb-1">{p.store.name}</p>
                    <p className={`text-xl font-bold ${p.price < product.price ? "text-green-600" : "text-gray-900"}`}>
                      {formatPrice(p.price)}
                    </p>
                    {p.price < product.price && (
                      <p className="text-xs text-green-600 mt-1">
                        Poupa {formatPrice(product.price - p.price)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="merkai-section-title mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/produto/${p.id}`}>
                <div className="merkai-card group">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-2xl">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-merkai-black line-clamp-2 group-hover:text-merkai-blue transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-lg font-bold text-merkai-blue mt-1">{formatPrice(p.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ProductReviews
        productId={product.id}
        productName={product.name}
        initialRating={product.rating}
        initialReviewCount={product.reviewCount}
      />
    </div>
  );
}
