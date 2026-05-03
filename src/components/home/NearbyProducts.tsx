"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, Star, MessageSquare } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice, formatDistance } from "@/lib/utils";
import { ReviewModal } from "@/components/product/ReviewModal";

export function NearbyProducts() {
  const [isClient, setIsClient] = useState(false);
  const [nearby, setNearby] = useState<typeof products>([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    const shuffled = [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((p) => ({ ...p, distance: Math.random() * 5 + 0.5 }));
    setNearby(shuffled);
  }, []);

  const openReviewModal = (product: { id: string; name: string }) => {
    setSelectedProduct(product);
    setReviewModalOpen(true);
  };

  return (
    <section className="merkai-container">
      <div className="flex items-center gap-2 mb-6">
        <Navigation className="w-5 h-5 text-merkai-blue" />
        <h2 className="merkai-section-title">Perto de Si</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {nearby.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="merkai-card group cursor-pointer flex flex-row md:flex-col relative">
              <Link href={`/produto/${product.id}`}>
                <div className="relative w-32 md:w-full md:aspect-square shrink-0 overflow-hidden rounded-l-2xl md:rounded-t-2xl md:rounded-l-none bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="p-3 flex-1 flex flex-col justify-center">
                <Link href={`/produto/${product.id}`}>
                  <h3 className="font-medium text-sm text-merkai-black mb-1 line-clamp-2 group-hover:text-merkai-blue transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-merkai-blue mb-1">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {isClient && product.distance !== undefined ? formatDistance(product.distance) : "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {product.rating}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  openReviewModal({ id: product.id, name: product.name });
                }}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-merkai-blue text-white shadow-sm hover:bg-merkai-blue-dark transition-colors"
                title="Avaliar produto"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProduct && (
        <ReviewModal
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
}