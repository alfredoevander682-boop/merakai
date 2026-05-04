"use client";

import { motion } from "framer-motion";
import { User, Store, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContaPage() {
  return (
    <div className="merkai-container py-8">
      <h1 className="text-3xl font-bold text-merkai-black mb-2">A sua Conta</h1>
      <p className="text-gray-500 mb-8">Escolha como quer usar o MERKAI</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <Link href="/vendedor/cadastro">
          <motion.div whileHover={{ y: -4 }} className="p-8 rounded-3xl bg-gradient-to-br from-merkai-blue to-merkai-blue-light text-white cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <Store className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold mb-2">Quero Vender</h2>
            <p className="text-white/80 text-sm mb-4">Cadastre a sua loja ou serviços e comece a vender no MERKAI.</p>
            <div className="flex items-center gap-1 text-sm font-medium">Começar <ArrowRight className="w-4 h-4" /></div>
          </motion.div>
        </Link>

        <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 flex items-center justify-center mb-4">
            <User className="w-7 h-7 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-merkai-black mb-2">Sou Comprador</h2>
          <p className="text-gray-500 text-sm mb-4">No MERKAI, compradores não precisam de conta. Pesquise e encontre produtos livremente.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-merkai-blue hover:text-merkai-blue-dark">
            Ir para a Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}