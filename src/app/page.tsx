import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { PopularProducts } from "@/components/home/PopularProducts";
import { NearbyProducts } from "@/components/home/NearbyProducts";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { BecomeSeller } from "@/components/home/BecomeSeller";

export const metadata = {
  title: "MERKAI — Encontre Produtos e Serviços em Angola",
  description: "Descubra produtos, compare preços e encontre lojas e prestadores de serviços perto de si em Angola.",
};

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <FeaturedCarousel />
      <CategoriesGrid />
      <PopularProducts />
      <NearbyProducts />
      <FeaturedServices />
      <BecomeSeller />
    </div>
  );
}
