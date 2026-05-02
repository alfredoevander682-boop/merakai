"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Package,
  BarChart3,
  Settings,
  Plus,
  Eye,
  MousePointer,
  TrendingUp,
  Star,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { getStoreProducts, stores } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const store = stores[0]; // Mock: primeira loja
const products = getStoreProducts(store.id);

const stats = [
  { label: "Visualizações", value: "12.4K", change: "+23%", up: true, icon: <Eye className="w-5 h-5" /> },
  { label: "Cliques", value: "3.2K", change: "+15%", up: true, icon: <MousePointer className="w-5 h-5" /> },
  { label: "Contactos", value: "856", change: "+8%", up: true, icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Avaliação", value: "4.7", change: "+0.2", up: true, icon: <Star className="w-5 h-5" /> },
];

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState<"produtos" | "estatisticas" | "perfil">("produtos");

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card sticky top-24">
          <div className="flex items-center gap-3 mb-6 p-2">
            <div className="w-10 h-10 rounded-xl bg-merkai-blue/10 flex items-center justify-center text-merkai-blue font-bold">
              {store.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm text-merkai-black">{store.name}</p>
              <p className="text-xs text-gray-500">{store.productsCount} produtos</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("produtos")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "produtos"
                  ? "bg-merkai-blue/10 text-merkai-blue"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Package className="w-4 h-4" />
              Produtos
            </button>
            <button
              onClick={() => setActiveTab("estatisticas")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "estatisticas"
                  ? "bg-merkai-blue/10 text-merkai-blue"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Estatísticas
            </button>
            <button
              onClick={() => setActiveTab("perfil")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "perfil"
                  ? "bg-merkai-blue/10 text-merkai-blue"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Settings className="w-4 h-4" />
              Perfil
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Products Tab */}
        {activeTab === "produtos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-merkai-black">Meus Produtos</h2>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-merkai-blue text-white rounded-full text-sm font-medium hover:bg-merkai-blue-dark transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar Produto
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                        Produto
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                        Preço
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                        Stock
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                        Views
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-merkai-black">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-sm">{formatPrice(product.price)}</p>
                          {product.comparePrice && (
                            <p className="text-xs text-gray-400 line-through">
                              {formatPrice(product.comparePrice)}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              product.inStock
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {product.inStock ? "Em stock" : "Esgotado"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {product.featured && (
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full">
                                Destaque
                              </span>
                            )}
                            {product.sponsored && (
                              <span className="px-2 py-0.5 bg-merkai-blue/10 text-merkai-blue text-xs rounded-full">
                                Patrocinado
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === "estatisticas" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-merkai-black">Estatísticas</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-merkai-blue/10 rounded-lg text-merkai-blue">
                      {stat.icon}
                    </div>
                    <span
                      className={`flex items-center gap-0.5 text-xs font-medium ${
                        stat.up ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.up ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-merkai-black">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card">
              <h3 className="font-semibold mb-4">Visualizações nos últimos 7 dias</h3>
              <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Gráfico de visualizações</p>
                  <p className="text-xs text-gray-300 mt-1">
                    Integração com Recharts / Chart.js
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "perfil" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-merkai-black">Perfil da Loja</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-merkai-blue/10 flex items-center justify-center text-3xl font-bold text-merkai-blue">
                  {store.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  <p className="text-sm text-gray-500">{store.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    defaultValue={store.name}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    defaultValue={store.phone}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={store.email || ""}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    defaultValue={store.city}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    defaultValue={store.description}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2.5 bg-merkai-blue text-white rounded-full text-sm font-medium hover:bg-merkai-blue-dark transition-colors">
                  Guardar Alterações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
