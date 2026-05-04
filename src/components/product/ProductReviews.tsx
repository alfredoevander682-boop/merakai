"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ReviewModal } from "./ReviewModal";
import { ReviewList } from "./ReviewList";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleSuccess = () => {
    fetchReviews();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-merkai-blue text-white rounded-full font-medium hover:bg-merkai-blue-dark transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Avaliar Produto
        </button>
      </div>

      {!loading && totalReviews > 0 && (
        <ReviewList reviews={reviews} avgRating={avgRating} />
      )}

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