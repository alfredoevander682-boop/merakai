import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/data";
import { ProductDetail } from "@/components/product/ProductDetail";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Necessário para static export [^42^]
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Produto não encontrado | MERKAI" };
  return {
    title: `${product.name} | MERKAI`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
