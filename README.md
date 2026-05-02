# MERKAI 🇦🇴

> **O marketplace angolano.** Descubra produtos, compare preços e encontre lojas e prestadores de serviços perto de si.

## 🎯 Conceito

O MERKAI é uma mistura de:
- **Google** — pesquisa rápida e simples
- **Amazon** — catálogo organizado de produtos  
- **OLX** — listagens locais com contacto directo

## ⚡ Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router, PPR, DynamicIO) |
| Runtime | React 19 |
| Estilos | Tailwind CSS 4 |
| UI Components | shadcn/ui pattern + custom |
| Animações | Framer Motion |
| Carrossel | Embla Carousel |
| Estado | Zustand (persist) |
| AI | Groq (LLaMA 3.3) + Gemini (fallback) |
| DB | Supabase (PostgreSQL) |
| ORM | Drizzle ORM |
| Mapas | Leaflet / React-Leaflet |
| Ícones | Lucide React |
| Toast | Sonner |

## 🏗️ Arquitectura

```
merkai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Home
│   │   ├── layout.tsx          # Root layout
│   │   ├── pesquisa/           # Página de pesquisa
│   │   ├── produto/[id]/       # Página do produto
│   │   ├── loja/[slug]/        # Página da loja
│   │   ├── servicos/           # Página de serviços
│   │   ├── vendedor/           # Torne-se vendedor
│   │   ├── dashboard/          # Dashboard do vendedor
│   │   ├── categoria/[slug]/   # Páginas de categoria
│   │   ├── favoritos/          # Favoritos
│   │   ├── conta/              # Conta
│   │   └── ...                 # Sobre, privacidade, termos
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── home/               # Hero, Carrossel, Categorias, etc.
│   │   ├── search/             # Resultados de pesquisa
│   │   ├── product/            # Detalhe do produto
│   │   ├── store/              # Detalhe da loja
│   │   ├── services/           # Lista de serviços
│   │   ├── seller/             # Formulário e Dashboard
│   │   └── ai/                 # Assistente IA
│   ├── lib/
│   │   ├── data.ts             # Dados mockados
│   │   ├── store.ts            # Zustand store
│   │   ├── ai.ts               # Integração AI
│   │   ├── supabase.ts         # Cliente Supabase
│   │   └── utils.ts            # Utilitários
│   └── types/
│       └── index.ts            # Tipos TypeScript
├── public/
└── package.json
```

## 🚀 Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/merkai/merkai.git
cd merkai

# 2. Instalar dependências (usando Bun - recomendado)
bun install

# 3. Configurar variáveis de ambiente
cp .env.local.example .env.local
# Editar .env.local com as suas chaves

# 4. Iniciar servidor de desenvolvimento
bun run dev
```

## 📋 Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# AI APIs
GROQ_API_KEY=sua-groq-key
GOOGLE_AI_API_KEY=sua-gemini-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎨 Sistema de Design

### Cores
- **Primária:** `#2563EB` (Azul moderno)
- **Background:** `#FFFFFF` (Branco)
- **Surface:** `#F5F5F5` (Cinza claro)
- **Texto:** `#111111` (Preto suave)
- **Acento:** `#F59E0B` (Âmbar)

### Tipografia
- **Fonte:** Inter (Google Fonts)
- **Tamanhos:** Escalados para legibilidade mobile-first

### Componentes
- **Botões:** Rounded-full, shadow-soft
- **Cards:** Rounded-2xl, shadow-card, hover com lift
- **Inputs:** Rounded-full, minimalistas

## 💰 Sistema de Destaque (Monetização)

| Tipo | Descrição | Preço (estimado) |
|------|-----------|-----------------|
| Destaque Home | Carrossel premium na homepage | 50.000 AOA/mês |
| Destaque Pesquisa | Topo dos resultados | 30.000 AOA/mês |
| Badge Patrocinado | Label especial no card | 15.000 AOA/mês |

## 🧠 Assistente IA

O chat flutuante usa:
- **Groq** (LLaMA 3.3 70B) — respostas rápidas
- **Gemini** (fallback) — caso Groq falhe
- **Funcionalidades:**
  - Filtra produtos automaticamente
  - Sugere com base no orçamento
  - Pergunta: "Quanto quer gastar?" / "Quer perto ou mais barato?"
  - Mostra cards de produtos directamente no chat

## 📱 Páginas Principais

| Página | Descrição |
|--------|-----------|
| `/` | Home com pesquisa, destaques, categorias |
| `/pesquisa?q=` | Resultados com filtros laterais |
| `/produto/[id]` | Detalhe do produto + comparação |
| `/loja/[slug]` | Perfil da loja + produtos |
| `/servicos` | Prestadores de serviços + mapa |
| `/vendedor` | Formulário de cadastro |
| `/dashboard` | Gestão de produtos e estatísticas |

## ⚠️ Regras do Produto

1. **Compradores NÃO precisam criar conta**
2. **NÃO existe pagamento online** (fase 1)
3. **Objetivo:** levar o utilizador até à loja física ou contacto
4. **Interface:** simples, rápida e limpa

## 🗺️ Roadmap

### Fase 1 (Actual)
- [x] Descoberta de produtos
- [x] Comparação de preços
- [x] Contacto directo (tel/WhatsApp)
- [x] Assistente IA
- [x] Dashboard básico

### Fase 2
- [ ] Pagamento online (M-Pesa, Multicaixa)
- [ ] Sistema de reviews
- [ ] Mapa interactivo (Leaflet)
- [ ] App mobile (React Native)
- [ ] Sistema de anúncios patrocinados

### Fase 3
- [ ] Entrega/logística
- [ ] MERKAI Pay
- [ ] Expansão para outras províncias
- [ ] API pública

## 🤝 Contribuir

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m "feat: nova feature"`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

MIT License — ver [LICENSE](LICENSE)

---

**MERKAI** — *Encontre o que precisa em Angola* 🇦🇴
