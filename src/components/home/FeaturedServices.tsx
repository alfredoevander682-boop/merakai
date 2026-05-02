"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Star, Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { getServiceProviders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function FeaturedServices() {
  const providers = getServiceProviders();

  return (
    <section className="merkai-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-merkai-blue" />
          <h2 className="merkai-section-title">Serviços em Destaque</h2>
        </div>
        <Link
          href="/servicos"
          className="text-sm font-medium text-merkai-blue hover:text-merkai-blue-dark flex items-center gap-1 transition-colors"
        >
          Ver todos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="merkai-card p-4 flex gap-4">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-merkai-blue to-merkai-blue-light flex items-center justify-center text-white text-xl font-bold">
                  {provider.name.charAt(0)}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-merkai-black">{provider.name}</h3>
                    <p className="text-sm text-merkai-blue font-medium">{provider.profession}</p>
                  </div>
                  {provider.isVerified && (
                    <span className="shrink-0 px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                      Verificado
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{provider.description}</p>

                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {provider.rating} ({provider.reviewCount})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {provider.city}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-semibold text-merkai-black">
                    A partir de {formatPrice(provider.basePrice)}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${provider.phone}`}
                      className="p-2 rounded-full bg-merkai-blue/10 text-merkai-blue hover:bg-merkai-blue hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    {provider.whatsapp && (
                      <a
                        href={`https://wa.me/${provider.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
