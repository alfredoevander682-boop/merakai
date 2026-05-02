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
  Clock,
  Package,
  Check,
  MessageCircle,
  Mail,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Store, Product } from "@/types";

export function StoreDetail({ store, products }: { store: Store; products: Product[] }) {
  const [activeTab, setActiveTab] = useState<"produtos" | "sobre">("produtos");

  return (
    <div className="merkai-container py-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft mb-8">
        <div className="h-32 bg-gradient-to-r from-merkai-blue to-merkai-blue-light" />
        <div className="px-6 pb-6">
          <div className="relative -mt-12 mb-4 flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-merkai-blue border-4 border-white">
              {store.name.charAt(0)}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-merkai-black">{store.name}</h1>
                {store.isVerified && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verificado
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-medium">{store.rating}</span>
                <span>({store.reviewCount} avaliações)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{store.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {store.address}
            </span>
            {store.openingHours && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {store.openingHours}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              {store.productsCount} produtos
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-merkai-blue text-white rounded-full text-sm font-medium hover:bg-merkai-blue-dark transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Ver Rota
            </a>
            <a
              href={`tel:${store.phone}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-merkai-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Ligar
            </a>
            {store.whatsapp && (
              <a
                href={`https://wa.me/${store.whatsapp.replace("+", "").replace(/ /g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            )}
            {store.email && (
              <a
                href={`mailto:${store.email}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-merkai-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("produtos")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "produtos"
              ? "bg-merkai-blue text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Produtos ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("sobre")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "sobre"
              ? "bg-merkai-blue text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Sobre
        </button>
      </div>

      {/* Content */}
      {activeTab === "produtos" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/produto/${product.id}`}>
                <div className="merkai-card group">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-2xl">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.sponsored && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                        Patrocinado
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-merkai-black line-clamp-2 group-hover:text-merkai-blue transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg font-bold text-merkai-blue">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "sobre" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card">
          <h2 className="font-semibold text-lg mb-4">Sobre {store.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{store.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-sm mb-2">Endereço</h3>
              <p className="text-sm text-gray-600">{store.address}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-sm mb-2">Contacto</h3>
              <p className="text-sm text-gray-600">{store.phone}</p>
              {store.email && <p className="text-sm text-gray-600">{store.email}</p>}
            </div>
            {store.openingHours && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-sm mb-2">Horário</h3>
                <p className="text-sm text-gray-600">{store.openingHours}</p>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-sm mb-2">Produtos</h3>
              <p className="text-sm text-gray-600">{store.productsCount} produtos disponíveis</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
