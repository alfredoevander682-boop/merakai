"use client";

import { useState } from "react";
import { X, Star, Send, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReviewModalProps {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
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
  const [reviews, setReviews] = useState<Review[]>([]);

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

      // Refresh reviews
      const reviewsRes = await fetch(`/api/reviews?productId=${productId}`);
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData.reviews || []);

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

  const avgRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-merkai-black">
            Avaliações - {productName}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Reviews Summary */}
          <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Média de Avaliações</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(avgRating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-merkai-black">{avgRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({reviews.length} avaliações)</span>
              </div>
            </div>
          </div>

          {/* Existing Reviews */}
          {reviews.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Avaliações dos Clientes</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-merkai-blue/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-merkai-blue" />
                        </div>
                        <span className="font-medium text-merkai-black">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {format(new Date(review.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Write Review Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Escrever Avaliação</h3>
              <button
                onClick={() => setStep(step === "identify" ? "rate" : "identify")}
                className="text-sm text-merkai-blue hover:underline"
              >
                {step === "identify" ? "Pular identificação" : "Voltar"}
              </button>
            </div>

            {step === "identify" ? (
              <form onSubmit={handleIdentify} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-merkai-blue text-white rounded-2xl font-medium hover:bg-merkai-blue-dark transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verificando...
                    </span>
                  ) : (
                    "Continuar →"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="p-2 transition-transform hover:scale-110"
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
                  <p className="mt-2 text-sm text-gray-500">
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
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </span>
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
      </div>
    </div>
  );
}