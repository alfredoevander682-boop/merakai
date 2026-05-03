"use client";

import { useState } from "react";
import { X, Star, Send } from "lucide-react";

interface ReviewModalProps {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReviewModal({ productId, productName, isOpen, onClose, onSuccess }: ReviewModalProps) {
  const [step, setStep] = useState<"identify" | "rate">("identify");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Nome e email são obrigatórios");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      return;
    }
    setError("");
    setStep("rate");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Por favor, selecione uma nota");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name, email, rating, comment: comment.trim() || null }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar avaliação");
      }

      onSuccess?.();
      onClose();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar avaliação");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("identify");
    setName("");
    setEmail("");
    setRating(0);
    setComment("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-merkai-black">
            {step === "identify" ? "Avaliar Produto" : "Sua Avaliação"}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="px-6 pt-4 text-sm text-gray-600">
          Avaliando: <span className="font-medium">{productName}</span>
        </p>

        {step === "identify" ? (
          <form onSubmit={handleIdentify} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-merkai-blue text-white rounded-2xl font-medium hover:bg-merkai-blue-dark transition-colors disabled:opacity-50"
            >
              Continuar
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nota *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {rating === 1 && "1 estrela - Ruim"}
                {rating === 2 && "2 estrelas - Regular"}
                {rating === 3 && "3 estrelas - Bom"}
                {rating === 4 && "4 estrelas - Muito bom"}
                {rating === 5 && "5 estrelas - Excelente"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comentário (opcional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-merkai-blue focus:border-transparent resize-none"
                placeholder="Conte sua experiência com este produto..."
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-merkai-blue text-white rounded-2xl font-medium hover:bg-merkai-blue-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Avaliação
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}