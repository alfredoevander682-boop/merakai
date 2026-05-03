import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/data";
import { CategoryContent } from "@/components/home/CategoryContent";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Necessário para static export [^42^]
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Categoria não encontrada | MERKAI" };
  return {
    title: `${category.name} | MERKAI`,
    description: `Explore ${category.productCount} produtos na categoria ${category.name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = getProductsByCategory(category.name);
  return <CategoryContent category={category} products={products} />;
}
