"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Star, User } from "lucide-react";
import { ReviewModal } from "./ReviewModal";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
  initialRating?: number;
  initialReviewCount?: number;
}

export function ProductReviews({ productId, productName, initialRating = 0, initialReviewCount = 0 }: ProductReviewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(initialRating);
  const [totalReviews, setTotalReviews] = useState(initialReviewCount);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews as Review[]);
        setAvgRating(data.avgRating);
        setTotalReviews(data.total);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    
    const handleOpenModal = (e: CustomEvent) => {
      setIsModalOpen(true);
    };
    window.addEventListener('openReviewModal', handleOpenModal as EventListener);
    
    return () => {
      window.removeEventListener('openReviewModal', handleOpenModal as EventListener);
    };
  }, [productId]);

  const handleSuccess = () => {
    fetchReviews();
  };

  return (
    <>
      {/* Reviews Summary */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-merkai-black">
            Avaliações ({totalReviews})
          </h2>
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
            <span className="text-lg font-bold text-merkai-black">{avgRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Recent Reviews */}
        {!loading && reviews.length > 0 && (
          <div className="space-y-3 mb-6">
            {reviews.slice(0, 3).map((review) => (
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
              </div>
            ))}
          </div>
        )}

        {/* Avaliar Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl font-bold hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
          Avaliar este Produto
        </button>
      </div>

      <ReviewModal
        productId={productId}
        productName={productName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}