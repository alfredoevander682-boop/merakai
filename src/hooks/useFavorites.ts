"use client";

import { useMerkaiStore } from "@/lib/store";

export function useFavorites() {
  const { favorites, toggleFavorite, isFavorite } = useMerkaiStore();

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}
