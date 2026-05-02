export const metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do MERKAI",
};

export default function PrivacidadePage() {
  return (
    <div className="merkai-container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-merkai-black mb-6">Política de Privacidade</h1>
      <div className="prose prose-gray max-w-none text-gray-600">
        <p className="mb-4">Última actualização: Abril 2026</p>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">1. Informações que Recolhemos</h2>
        <p className="mb-4">O MERKAI recolhe informações mínimas necessárias para funcionar:</p>
        <ul className="space-y-2 mb-4">
          <li>• Localização aproximada (para mostrar produtos perto de si)</li>
          <li>• Pesquisas recentes (guardadas localmente no seu dispositivo)</li>
          <li>• Favoritos (guardados localmente)</li>
        </ul>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">2. Não Recolhemos</h2>
        <p className="mb-4">O MERKAI não recolhe:</p>
        <ul className="space-y-2 mb-4">
          <li>• Dados pessoais de compradores (não é necessário criar conta)</li>
          <li>• Informações de pagamento</li>
          <li>• Dados de navegação para publicidade</li>
        </ul>
        <h2 className="text-xl font-bold text-merkai-black mt-6 mb-3">3. Contacto</h2>
        <p>Para questões sobre privacidade: contacto@merkai.ao</p>
      </div>
    </div>
  );
}
