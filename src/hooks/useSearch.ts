"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMerkaiStore } from "@/lib/store";

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addRecentSearch } = useMerkaiStore();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const executeSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      addRecentSearch(searchQuery.trim());

      startTransition(() => {
        router.push(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`);
      });
    },
    [router, addRecentSearch]
  );

  return {
    query,
    setQuery,
    executeSearch,
    isPending,
  };
}
