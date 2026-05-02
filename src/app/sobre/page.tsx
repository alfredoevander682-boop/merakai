export const metadata = {
  title: "Sobre",
  description: "Conheça o MERKAI - O marketplace angolano",
};

export default function SobrePage() {
  return (
    <div className="merkai-container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-merkai-black mb-6">Sobre o MERKAI</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          O MERKAI é a plataforma de descoberta de produtos e serviços de Angola. 
          A nossa missão é conectar compradores com lojas físicas e prestadores de serviços 
          de forma simples, rápida e sem complicação.
        </p>
        <h2 className="text-xl font-bold text-merkai-black mt-8 mb-4">A Nossa Visão</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Queremos ser o Google dos produtos angolanos - o lugar onde qualquer pessoa pode 
          encontrar o que precisa, comparar preços e ir diretamente à loja física.
        </p>
        <h2 className="text-xl font-bold text-merkai-black mt-8 mb-4">Como Funciona</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Pesquise produtos ou serviços</li>
          <li>• Compare preços de diferentes lojas</li>
          <li>• Veja a localização no mapa</li>
          <li>• Contacte diretamente a loja</li>
          <li>• Visite a loja física</li>
        </ul>
        <h2 className="text-xl font-bold text-merkai-black mt-8 mb-4">Para Vendedores</h2>
        <p className="text-gray-600 leading-relaxed">
          Cadastre a sua loja gratuitamente e alcance milhares de potenciais clientes. 
          Sem mensalidades, sem comissões na fase 1.
        </p>
      </div>
    </div>
  );
}
