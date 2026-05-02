"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Store, TrendingUp, Users, Shield } from "lucide-react";

const benefits = [
  { icon: <Users className="w-5 h-5" />, text: "Alcance milhares de clientes" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "Aumente suas vendas" },
  { icon: <Shield className="w-5 h-5" />, text: "Plataforma segura e gratuita" },
];

export function BecomeSeller() {
  return (
    <section className="merkai-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-merkai-black to-gray-900 text-white p-8 md:p-12"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-merkai-blue rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-merkai-blue-light rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-merkai-blue/20 text-merkai-blue-light text-sm font-medium mb-4">
              <Store className="w-4 h-4" />
              Para Vendedores
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem uma loja ou presta serviços?
            </h2>
            <p className="text-gray-400 mb-6">
              Junte-se ao MERKAI e alcance milhares de clientes em Angola. 
              Cadastro simples, sem mensalidades.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="p-1.5 rounded-full bg-white/10">{benefit.icon}</div>
                  {benefit.text}
                </div>
              ))}
            </div>

            <Link
              href="/vendedor"
              className="inline-flex items-center gap-2 px-8 py-4 bg-merkai-blue hover:bg-merkai-blue-dark text-white rounded-full font-medium transition-colors"
            >
              <Store className="w-5 h-5" />
              Torne-se Vendedor
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-merkai-blue/20 to-merkai-blue-light/20 border border-white/10 flex items-center justify-center">
              <Store className="w-20 h-20 text-merkai-blue-light/50" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
