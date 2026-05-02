"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Wrench,
  ChevronDown,
  Check,
  Navigation,
} from "lucide-react";
import { getServiceProviders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function ServicesList() {
  const [query, setQuery] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const providers = getServiceProviders();

  const filtered = providers.filter((p) => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.profession.toLowerCase().includes(query.toLowerCase()) ||
      p.services.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    const matchesProfession = !selectedProfession || p.profession === selectedProfession;
    return matchesQuery && matchesProfession;
  });

  const professions = [...new Set(providers.map((p) => p.profession))];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Wrench className="w-6 h-6 text-merkai-blue" />
          <h1 className="text-3xl font-bold text-merkai-black">Serviços</h1>
        </div>
        <p className="text-gray-500">
          Encontre prestadores de serviços qualificados perto de si
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por nome, profissão ou serviço..."
            className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
          />
        </div>
        <div className="relative">
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="appearance-none w-full md:w-48 pl-4 pr-10 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 cursor-pointer"
          >
            <option value="">Todas as profissões</option>
            {professions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="merkai-card p-5">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-merkai-blue to-merkai-blue-light flex items-center justify-center text-white text-xl font-bold">
                      {provider.name.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-merkai-black">{provider.name}</h3>
                        <p className="text-sm text-merkai-blue font-medium">{provider.profession}</p>
                      </div>
                      {provider.isVerified && (
                        <span className="shrink-0 px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Verificado
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{provider.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {provider.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {provider.rating} ({provider.reviewCount})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {provider.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-semibold text-merkai-black">
                          A partir de {formatPrice(provider.basePrice)}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <a
                        href={`tel:${provider.phone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-merkai-blue text-white rounded-full text-sm font-medium hover:bg-merkai-blue-dark transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Ligar
                      </a>
                      {provider.whatsapp && (
                        <a
                          href={`https://wa.me/${provider.whatsapp.replace("+", "").replace(/ /g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      )}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${provider.coordinates.lat},${provider.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-merkai-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        Rota
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Nenhum prestador encontrado
              </h3>
              <p className="text-sm text-gray-400">
                Tente pesquisar com termos diferentes.
              </p>
            </div>
          )}
        </div>

        {/* Map placeholder */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-gray-100 rounded-2xl border border-gray-200 h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 font-medium">Mapa Interactivo</p>
              <p className="text-xs text-gray-400 mt-1">
                Integração com Leaflet / Google Maps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
