"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Wrench,
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  Check,
  ArrowRight,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function SellerForm() {
  const [type, setType] = useState<"loja" | "prestador">("loja");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    address: "",
    city: "Luanda",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Cadastro recebido! Entraremos em contacto em breve.");
    setIsSubmitting(false);
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-merkai-blue/10 text-merkai-blue mb-4">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-merkai-black mb-2">
          Torne-se Vendedor
        </h1>
        <p className="text-gray-500">
          Cadastre a sua loja ou serviços e alcance milhares de clientes
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s <= step
                  ? "bg-merkai-blue text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 rounded-full ${
                  s < step ? "bg-merkai-blue" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Type Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-center mb-6">
            Que tipo de negócio tem?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setType("loja");
                setStep(2);
              }}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                type === "loja"
                  ? "border-merkai-blue bg-merkai-blue/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-merkai-blue/10 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-merkai-blue" />
              </div>
              <h3 className="font-semibold text-merkai-black mb-1">Loja Física</h3>
              <p className="text-sm text-gray-500">
                Venda produtos físicos. Electrónica, moda, alimentação, etc.
              </p>
            </button>

            <button
              onClick={() => {
                setType("prestador");
                setStep(2);
              }}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                type === "prestador"
                  ? "border-merkai-blue bg-merkai-blue/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-merkai-black mb-1">
                Prestador de Serviços
              </h3>
              <p className="text-sm text-gray-500">
                Ofereça serviços. Canalizador, eletricista, designer, etc.
              </p>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card">
              <h2 className="font-semibold text-lg mb-4">
                Informações do {type === "loja" ? "Negócio" : "Serviço"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nome do {type === "loja" ? "Negócio" : "Prestador"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={type === "loja" ? "Ex: Nova Electrónica" : "Ex: Carlos Manuel"}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 border border-transparent focus:border-merkai-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@exemplo.com"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 border border-transparent focus:border-merkai-blue"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+244 9xx xxx xxx"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 border border-transparent focus:border-merkai-blue"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descrição
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Descreva o seu negócio ou serviços..."
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 border border-transparent focus:border-merkai-blue resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Endereço
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Rua, Bairro, Cidade"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 border border-transparent focus:border-merkai-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cidade
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 border border-transparent focus:border-merkai-blue"
                  >
                    <option>Luanda</option>
                    <option>Benguela</option>
                    <option>Huambo</option>
                    <option>Lubango</option>
                    <option>Malanje</option>
                  </select>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Logo (opcional)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-merkai-blue/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Clique para fazer upload ou arraste
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG até 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 bg-gray-100 text-merkai-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-merkai-blue text-white rounded-full font-medium hover:bg-merkai-blue-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar Cadastro
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-merkai-black mb-2">
            Cadastro Enviado!
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            A nossa equipa vai analisar o seu cadastro e entrar em contacto consigo em breve.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/">
              <a className="px-6 py-3 bg-merkai-blue text-white rounded-full font-medium hover:bg-merkai-blue-dark transition-colors">
                Voltar à Home
              </a>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
