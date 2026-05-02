"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Flame, Star, MapPin, Eye } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { formatPrice} from "@/lib/utils";

export function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const featured = getFeaturedProducts();

  return (
    <section className="merkai-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          <h2 className="merkai-section-title">Em Destaque</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-[0_0_280px] md:flex-[0_0_320px] lg:flex-[0_0_380px]"
            >
              <Link href={`/produto/${product.id}`}>
                <div className="merkai-card group cursor-pointer h-full">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.sponsored && (
                        <span className="merkai-badge-sponsored">
                          <Flame className="w-3 h-3 mr-1" />
                          Patrocinado
                        </span>
                      )}
                      {product.featured && !product.sponsored && (
                        <span className="merkai-badge-hot">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </span>
                      )}
                    </div>
                    {/* Views */}
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {product.views.toLocaleString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-merkai-black mb-1 line-clamp-2 group-hover:text-merkai-blue transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl font-bold text-merkai-blue">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {product.store.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
