"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, Star } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice, formatDistance } from "@/lib/utils";

export function NearbyProducts() {
  const [isClient, setIsClient] = useState(false);
  const [nearby, setNearby] = useState<typeof products>([]);

  useEffect(() => {
    setIsClient(true);
    // Só calcula os produtos próximos no cliente (evita hydration mismatch)
    const shuffled = [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((p) => ({ ...p, distance: Math.random() * 5 + 0.5 }));
    setNearby(shuffled);
  }, []);

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
            <Link href={`/produto/${product.id}`}>
              <div className="merkai-card group cursor-pointer flex flex-row md:flex-col">
                <div className="relative w-32 md:w-full md:aspect-square shrink-0 overflow-hidden rounded-l-2xl md:rounded-t-2xl md:rounded-l-none bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-center">
                  <h3 className="font-medium text-sm text-merkai-black mb-1 line-clamp-2 group-hover:text-merkai-blue transition-colors">
                    {product.name}
                  </h3>
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
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}