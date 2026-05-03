'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
  showCount?: boolean;
  count?: number;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  onRate, 
  readOnly = false,
  size = 24,
  showCount = false,
  count = 0
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const filled = readOnly ? starValue <= rating : starValue <= (hoverRating || rating);
          
          return (
            <button
              key={index}
              type="button"
              disabled={readOnly}
              className={`transition-transform hover:scale-110 ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
              onMouseEnter={() => !readOnly && setHoverRating(starValue)}
              onMouseLeave={() => !readOnly && setHoverRating(0)}
              onClick={() => !readOnly && onRate?.(starValue)}
            >
              <Star
                size={size}
                className={`transition-colors ${
                  filled 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'fill-gray-200 text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showCount && count > 0 && (
        <span className="text-sm text-gray-500">({count} avaliações)</span>
      )}
      {readOnly && rating > 0 && (
        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}