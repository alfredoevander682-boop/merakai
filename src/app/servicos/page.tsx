import { Suspense } from "react";
import { ServicesList } from "@/components/services/ServicesList";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";

export const metadata = {
  title: "Serviços",
  description: "Encontre prestadores de serviços em Angola - canalizadores, eletricistas, mecânicos e mais",
};

export default function ServicesPage() {
  return (
    <div className="merkai-container py-8">
      <Suspense fallback={<SearchSkeleton />}>
        <ServicesList />
      </Suspense>
    </div>
  );
}
