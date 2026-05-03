"use client";

import { Star } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  avgRating: number;
}

export function ReviewList({ reviews, avgRating }: ReviewListProps) {
  if (reviews.length === 0) {
    return null;
  }

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-bold text-merkai-black mb-6">
        Avaliações ({reviews.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-merkai-black">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center gap-1 mt-2">
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
            <p className="text-sm text-gray-500 mt-1">{reviews.length} avaliações</p>
          </div>

          <div className="space-y-2">
            {ratingCounts.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{stars}</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-merkai-blue/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-merkai-blue">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
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
                {format(new Date(review.createdAt), "PPpp", { locale: ptBR })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}