'use client';

import { useState } from 'react';
import { 
  Users, 
  Store, 
  Package, 
  ShoppingCart, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface Seller {
  id: string;
  user: { name: string; email: string; image?: string };
  businessName: string;
  businessType: string;
  documentNumber: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalSellers: number;
  pendingSellers: number;
  totalProducts: number;
  totalOrders: number;
}

export default function AdminDashboard({ pendingSellers, stats }: { 
  pendingSellers: Seller[]; 
  stats: Stats 
}) {
  const [sellers, setSellers] = useState(pendingSellers);
  const [activeTab, setActiveTab] = useState('overview');

  const handleApprove = async (sellerId: string) => {
    try {
      const response = await fetch(`/api/admin/sellers/${sellerId}/approve`, {
        method: 'POST',
      });
      if (response.ok) {
        setSellers(prev => prev.filter(s => s.id !== sellerId));
      }
    } catch (error) {
      console.error('Erro ao aprovar:', error);
    }
  };

  const handleReject = async (sellerId: string) => {
    try {
      const response = await fetch(`/api/admin/sellers/${sellerId}/reject`, {
        method: 'POST',
      });
      if (response.ok) {
        setSellers(prev => prev.filter(s => s.id !== sellerId));
      }
    } catch (error) {
      console.error('Erro ao rejeitar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Painel de Administração - MERKAI</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            Acesso restrito
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('sellers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'sellers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Vendedores Pendentes
            {sellers.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {sellers.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { label: 'Usuários', value: stats.totalUsers, icon: Users, color: 'blue' },
                { label: 'Vendedores', value: stats.totalSellers, icon: Store, color: 'green' },
                { label: 'Pendentes', value: stats.pendingSellers, icon: Clock, color: 'yellow' },
                { label: 'Produtos', value: stats.totalProducts, icon: Package, color: 'purple' },
                { label: 'Pedidos', value: stats.totalOrders, icon: ShoppingCart, color: 'orange' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                  <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-medium">Relatórios de Vendas</p>
                  <p className="text-sm text-gray-500">Ver métricas detalhadas</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
                  <Users className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-medium">Gerenciar Usuários</p>
                  <p className="text-sm text-gray-500">Ver e editar usuários</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
                  <Package className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="font-medium">Moderar Produtos</p>
                  <p className="text-sm text-gray-500">Aprovar ou rejeitar</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sellers' && (
          <div className="space-y-4">
            {sellers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">Tudo em ordem!</h3>
                <p className="text-gray-500 mt-2">Não há vendedores pendentes de aprovação.</p>
              </div>
            ) : (
              sellers.map((seller) => (
                <div key={seller.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                        {seller.user.image ? (
                          <img src={seller.user.image} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <Users className="w-7 h-7 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{seller.businessName}</h3>
                        <p className="text-gray-500 text-sm">{seller.user.name} • {seller.user.email}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            {seller.businessType}
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            NIF: {seller.documentNumber}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Solicitado em {new Date(seller.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleReject(seller.id)}
                        className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeitar
                      </button>
                      <button
                        onClick={() => handleApprove(seller.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aprovar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}