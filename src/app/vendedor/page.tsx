import { SellerForm } from "@/components/seller/SellerForm";

export const metadata = {
  title: "Torne-se Vendedor",
  description: "Cadastre a sua loja ou serviços no MERKAI e alcance milhares de clientes em Angola",
};

export default function SellerPage() {
  return (
    <div className="merkai-container py-8">
      <SellerForm />
    </div>
  );
}
