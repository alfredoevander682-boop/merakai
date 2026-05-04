"use client";

import { useState, useEffect } from "react";
import { Users, Store, Package, ShoppingCart, FileText, Check, X, Loader2 } from "lucide-react";

interface Seller {
  id: number;
  email: string;
  businessName: string;
  nif: string;
  businessType: string | null;
  phone: string | null;
  city: string | null;
  status: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
}

type Tab = "overview" | "sellers" | "products" | "orders";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalSellers: 0, totalProducts: 0, totalOrders: 0 });
  const [pendingSellers, setPendingSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, sellersRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/sellers")
      ]);
      const statsData = await statsRes.json();
      const sellersData = await sellersRes.json();
      setStats(statsData);
      setPendingSellers(sellersData.sellers || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/sellers/${id}/approve`, { method: "POST" });
      if (res.ok) {
        setPendingSellers(prev => prev.filter(s => s.id !== id));
        fetchData();
      }
    } catch (error) {
      console.error("Error approving seller:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: number) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/sellers/${id}/reject`, { method: "POST" });
      if (res.ok) {
        setPendingSellers(prev => prev.filter(s => s.id !== id));
        fetchData();
      }
    } catch (error) {
      console.error("Error rejecting seller:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const getBadge = (id: Tab) => {
    if (id === "sellers") return pendingSellers.length;
    return 0;
  };

  const tabs: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: "overview", label: "Visao Geral", icon: FileText },
    { id: "sellers", label: "Solicitacoes", icon: Users },
    { id: "products", label: "Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
  ];

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
          <h1 className="text-xl font-bold">Painel Administrativo MERKAI</h1>
          <button onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin/login';
          }} className="text-sm bg-white text-merkai-blue px-3 py-1 rounded-full hover:bg-gray-100 transition-colors">Sair</button>
        </div>

      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-merkai-blue text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="flex-1">{tab.label}</span>
                {getBadge(tab.id) > 0 && (
                  <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {getBadge(tab.id)}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Visao Geral</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      <p className="text-sm text-gray-500">Total Usuarios</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Store className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalSellers}</p>
                      <p className="text-sm text-gray-500">Vendedores Ativos</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalProducts}</p>
                      <p className="text-sm text-gray-500">Produtos</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                      <p className="text-sm text-gray-500">Pedidos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sellers" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Solicitacoes de Vendedores</h2>
              {pendingSellers.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma solicitacao pendente</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingSellers.map((seller) => (
                    <div key={seller.id} className="bg-white p-6 rounded-2xl shadow-card">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{seller.businessName}</h3>
                          <p className="text-sm text-gray-500">{seller.email}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">NIF: {seller.nif}</span>
                            {seller.businessType && (
                              <span className="bg-gray-100 px-3 py-1 rounded-full">{seller.businessType}</span>
                            )}
                            {seller.phone && (
                              <span className="bg-gray-100 px-3 py-1 rounded-full">{seller.phone}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(seller.id)}
                            disabled={processingId === seller.id}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            <Check className="w-4 h-4" />
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleReject(seller.id)}
                            disabled={processingId === seller.id}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Rejeitar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
              <div className="bg-white rounded-2xl p-12 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Em desenvolvimento</p>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Pedidos</h2>
              <div className="bg-white rounded-2xl p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Em desenvolvimento</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}