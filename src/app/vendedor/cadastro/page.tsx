"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Wrench, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SellerRegisterWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: type, 1: details, 2: confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    nif: "",
    businessType: "",
    phone: "",
    city: "",
    description: "",
    deliveryOption: "",
    logoFile: null as File | null,
    termsAccepted: false,
  });

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStepOne = () => {
    return formData.businessType !== "";
  };

  const validateStepTwo = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) return false;
    if (formData.password !== formData.confirmPassword) return false;
    if (formData.password.length < 6) return false;
    if (!formData.businessName || !formData.nif || !formData.phone || !formData.city) return false;
    if (!/^[0-9]{9}$/.test(formData.nif)) return false; // 9 digits for Angola
    if (formData.businessType === "Produtos Físicos" && formData.deliveryOption === "") return false;
    if (!formData.termsAccepted) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStepTwo()) {
      setError("Preencha todos os campos corretamente.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        nif: formData.nif,
        businessType: formData.businessType,
        phone: formData.phone,
        city: formData.city,
        // extra fields are ignored by API but kept for future use
        description: formData.description,
        deliveryOption: formData.deliveryOption,
      };
      const res = await fetch("/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao registrar");
      }
      console.log("Simulated email confirmation sent to", formData.email);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  // Step components
  const renderStepOne = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-merkai-black">Que tipo de negócio tens?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className={cn(
            "cursor-pointer hover:shadow-md transition-shadow",
            formData.businessType === "Produtos Físicos" && "ring-2 ring-merkai-blue"
          )}
          onClick={() => handleChange("businessType", "Produtos Físicos")}
        >
          <CardHeader className="flex flex-col items-center">
            <Store className="w-12 h-12 text-merkai-blue mb-2" />
            <CardTitle>🏪 Produtos Físicos</CardTitle>
          </CardHeader>
        </Card>
        <Card
          className={cn(
            "cursor-pointer hover:shadow-md transition-shadow",
            formData.businessType === "Serviços Digitais" && "ring-2 ring-merkai-blue"
          )}
          onClick={() => handleChange("businessType", "Serviços Digitais")}
        >
          <CardHeader className="flex flex-col items-center">
            <Wrench className="w-12 h-12 text-merkai-blue mb-2" />
            <CardTitle>🔧 Serviços Digitais</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => setStep(1)}
          disabled={!validateStepOne()}
          variant="default"
        >
          Continuar
        </Button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={e => handleChange("email", e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
          <Input
            type="password"
            value={formData.password}
            onChange={e => handleChange("password", e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha *</label>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={e => handleChange("confirmPassword", e.target.value)}
            placeholder="Repita a senha"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da empresa *</label>
          <Input
            type="text"
            value={formData.businessName}
            onChange={e => handleChange("businessName", e.target.value)}
            placeholder="Nome da sua empresa"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIF *</label>
          <Input
            type="text"
            value={formData.nif}
            onChange={e => handleChange("nif", e.target.value)}
            placeholder="Número de Identificação Fiscal (9 dígitos)"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={e => handleChange("phone", e.target.value)}
            placeholder="+244 9xx xxx xxx"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
          <Input
            type="text"
            value={formData.city}
            onChange={e => handleChange("city", e.target.value)}
            placeholder="Luanda, Benguela, etc."
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do negócio (máx 500 caracteres)</label>
          <textarea
            value={formData.description}
            onChange={e => handleChange("description", e.target.value)}
            maxLength={500}
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merkai-blue"
            rows={4}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.description.length}/500
          </div>
        </div>
        {/* Delivery options only for physical products */}
        {formData.businessType === "Produtos Físicos" && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de entrega *</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="delivery"
                  value="Envio próprio"
                  checked={formData.deliveryOption === "Envio próprio"}
                  onChange={e => handleChange("deliveryOption", e.target.value)}
                  className="h-4 w-4 text-merkai-blue border-gray-300 rounded"
                />
                <span>Envio próprio</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="delivery"
                  value="Pickup"
                  checked={formData.deliveryOption === "Pickup"}
                  onChange={e => handleChange("deliveryOption", e.target.value)}
                  className="h-4 w-4 text-merkai-blue border-gray-300 rounded"
                />
                <span>Pickup</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="delivery"
                  value="Ambos"
                  checked={formData.deliveryOption === "Ambos"}
                  onChange={e => handleChange("deliveryOption", e.target.value)}
                  className="h-4 w-4 text-merkai-blue border-gray-300 rounded"
                />
                <span>Ambos</span>
              </label>
            </div>
          </div>
        )}
        {/* Logo upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              handleChange("logoFile", file);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-merkai-blue file:text-white hover:file:bg-merkai-blue-dark"
          />
          {formData.logoFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formData.logoFile)}
                alt="Pré‑visualização do logo"
                className="h-24 w-auto rounded"
              />
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={e => handleChange("termsAccepted", e.target.checked)}
              className="h-4 w-4 text-merkai-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Aceito os termos de vendedor</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>
      )}

      <div className="flex justify-between items-center">
        <Button type="button" onClick={() => setStep(0)} variant="secondary">
          Anterior
        </Button>
        <Button type="submit" disabled={loading} variant="default">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            "Submeter Candidatura"
          )}
        </Button>
      </div>
    </form>
  );

  const renderStepThree = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <svg
          className="w-24 h-24 text-emerald-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Candidatura recebida! A nossa equipa vai analisar e entrar em contacto em breve.
      </h2>
      <Button onClick={() => router.push("/")}>Voltar à página inicial</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 shadow-card">
          {step === 0 && renderStepOne()}
          {step === 1 && renderStepTwo()}
          {step === 2 && renderStepThree()}
        </Card>
      </div>
    </div>
  );
}
