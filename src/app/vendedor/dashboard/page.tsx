"use client";

import { useState, useEffect } from "react";
import { Package, Plus, Eye, DollarSign, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface SellerInfo {
  id: number;
  email: string;
  businessName: string;
  status: string;
}

export default function SellerDashboardPage() {
  const router = useRouter();
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/seller/check-status");
      const data = await res.json();

      if (!res.ok || data.status !== "APPROVED") {
        router.push("/vendedor/login");
        return;
      }

      setSeller(data.seller);
    } catch (error) {
      console.error("Error checking status:", error);
      router.push("/vendedor/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "seller-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/vendedor/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-merkai-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-merkai-blue text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Painel do Vendedor</h1>
          <p className="text-sm text-white/80">{seller?.businessName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Meus Produtos</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Vendas Totais</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Visualizações</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Plus className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Novos Pedidos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border border-gray-200 rounded-xl hover:border-merkai-blue hover:bg-merkai-blue/5 transition-colors flex flex-col items-center gap-2">
                <Plus className="w-6 h-6 text-merkai-blue" />
                <span className="text-sm font-medium">Novo Produto</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-xl hover:border-merkai-blue hover:bg-merkai-blue/5 transition-colors flex flex-col items-center gap-2">
                <Package className="w-6 h-6 text-merkai-blue" />
                <span className="text-sm font-medium">Gerir Produtos</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-xl hover:border-merkai-blue hover:bg-merkai-blue/5 transition-colors flex flex-col items-center gap-2">
                <DollarSign className="w-6 h-6 text-merkai-blue" />
                <span className="text-sm font-medium">Ver Pedidos</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-xl hover:border-merkai-blue hover:bg-merkai-blue/5 transition-colors flex flex-col items-center gap-2">
                <Eye className="w-6 h-6 text-merkai-blue" />
                <span className="text-sm font-medium">Estatísticas</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-semibold mb-4">Informações da Conta</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Ativo
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="text-merkai-black">{seller?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}