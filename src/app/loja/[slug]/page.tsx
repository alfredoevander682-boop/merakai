import { notFound } from "next/navigation";
import { getStoreBySlug, getStoreProducts, stores } from "@/lib/data";
import { StoreDetail } from "@/components/store/StoreDetail";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

// Necessário para static export [^42^]
export async function generateStaticParams() {
  return stores.map((store) => ({
    slug: store.slug,
  }));
}

export async function generateMetadata({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) return { title: "Loja não encontrada | MERKAI" };
  return {
    title: `${store.name} | MERKAI`,
    description: store.description,
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();
  const storeProducts = getStoreProducts(store.id);
  return <StoreDetail store={store} products={storeProducts} />;
}
