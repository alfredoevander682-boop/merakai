"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, UserLocation, AIChatMessage } from "@/types";

interface MerkaiState {
  // Location
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Recent searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // AI Chat
  aiMessages: AIChatMessage[];
  addAiMessage: (message: AIChatMessage) => void;
  clearAiMessages: () => void;

  // Cart (for future)
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;

  // UI State
  isAiChatOpen: boolean;
  toggleAiChat: () => void;
}

export const useMerkaiStore = create<MerkaiState>()(
  persist(
    (set, get) => ({
      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),

      favorites: [],
      toggleFavorite: (productId) => {
        const { favorites } = get();
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter((id) => id !== productId) });
        } else {
          set({ favorites: [...favorites, productId] });
        }
      },
      isFavorite: (productId) => get().favorites.includes(productId),

      recentSearches: [],
      addRecentSearch: (query) => {
        const { recentSearches } = get();
        const filtered = recentSearches.filter((s) => s !== query);
        set({ recentSearches: [query, ...filtered].slice(0, 10) });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),

      aiMessages: [],
      addAiMessage: (message) =>
        set({ aiMessages: [...get().aiMessages, message] }),
      clearAiMessages: () => set({ aiMessages: [] }),

      cart: [],
      addToCart: (product) => set({ cart: [...get().cart, product] }),
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((p) => p.id !== productId) }),

      isAiChatOpen: false,
      toggleAiChat: () => set({ isAiChatOpen: !get().isAiChatOpen }),
    }),
    {
      name: "merkai-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        recentSearches: state.recentSearches,
        userLocation: state.userLocation,
        aiMessages: state.aiMessages,
      }),
    }
  )
);
