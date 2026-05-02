export const metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do MERKAI",
};

export default function TermosPage() {
  return (
    <div className="merkai-container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-merkai-black mb-6">Termos de Uso</h1>
      <div className="prose prose-gray max-w-none text-gray-600">
        <p className="mb-4">Última actualização: Abril 2026</p>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">1. Aceitação dos Termos</h2>
        <p className="mb-4">Ao usar o MERKAI, concorda com estes termos de uso.</p>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">2. Uso da Plataforma</h2>
        <p className="mb-4">O MERKAI é uma plataforma de descoberta. Não somos responsáveis pelas transacções entre compradores e vendedores.</p>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">3. Vendedores</h2>
        <p className="mb-4">Os vendedores são responsáveis pela exactidão das informações dos produtos e pela qualidade dos serviços prestados.</p>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">4. Alterações</h2>
        <p>Reservamos o direito de alterar estes termos a qualquer momento.</p>
      </div>
    </div>
  );
}
