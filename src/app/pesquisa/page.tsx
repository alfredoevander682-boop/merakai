import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";

export const metadata = {
  title: "Pesquisa",
  description: "Pesquise produtos, lojas e serviços em Angola",
};

export default function SearchPage() {
  return (
    <div className="merkai-container py-8">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
