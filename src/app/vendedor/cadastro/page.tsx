"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building, FileText, Phone, MapPin, Loader2 } from "lucide-react";

export default function SellerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    nif: "",
    businessType: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao registrar");
      }

      alert("Solicitação enviada! Aguarde aprovação da equipe MERKAI.");
      router.push("/vendedor/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="merkai-container">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-merkai-black">Torne-se Vendedor MERKAI</h1>
              <p className="text-gray-500 mt-1">Preencha seus dados para comenzar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                    placeholder="Repita a senha"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleChange("businessName", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                      placeholder="Nome da sua empresa"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIF *</label>
                  <input
                    type="text"
                    value={formData.nif}
                    onChange={(e) => handleChange("nif", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                    placeholder="Número de Identificação Fiscal"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Negócio *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleChange("businessType", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Loja Física">Loja Física</option>
                    <option value="Online">Apenas Online</option>
                    <option value="Empório">Empório/Mercearia</option>
                    <option value="Atacado">Atacado</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                      placeholder="+244 9xx xxx xxx"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                      placeholder="Luanda, Benguela, etc."
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-merkai-blue text-white rounded-2xl font-medium hover:bg-merkai-blue-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Solicitação"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}