import { PopularProducts } from "@/components/home/PopularProducts";

export const metadata = {
  title: "Todos os Produtos",
  description: "Explore todos os produtos disponíveis no MERKAI",
};

export default function ProdutosPage() {
  return (
    <div className="merkai-container py-8">
      <h1 className="text-3xl font-bold text-merkai-black mb-8">Todos os Produtos</h1>
      <PopularProducts />
    </div>
  );
}
