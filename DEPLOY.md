# 🚀 Deploy do MERKAI

## Requisitos

- Node.js 20+ ou Bun
- Conta Supabase (gratuita)
- Chaves API Groq e Google AI

## Passo a Passo

### 1. Instalar Dependências

```bash
cd merkai
bun install
# ou
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
GROQ_API_KEY=sua-groq-key
GOOGLE_AI_API_KEY=sua-gemini-key
DATABASE_URL=postgresql://user:pass@localhost:5432/merkai
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configurar Base de Dados

```bash
# Gerar migrações
bun run db:generate

# Aplicar migrações
bun run db:migrate

# Ou usar Supabase Dashboard para criar tabelas manualmente
```

### 4. Desenvolvimento

```bash
bun run dev
```

Acesse: http://localhost:3000

### 5. Build para Produção

```bash
bun run build
bun run start
```

### 6. Deploy na Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configure as variáveis de ambiente no dashboard da Vercel.

## 📋 Checklist Pré-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Base de dados criada no Supabase
- [ ] Tabelas criadas (stores, products, service_providers, categories)
- [ ] Imagens de produtos hospedadas (Supabase Storage ou CDN)
- [ ] Domínio configurado
- [ ] SSL/HTTPS ativado
- [ ] Analytics configurado (opcional)

## 🔧 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules
bun install
```

### Erro: "Failed to compile"
```bash
# Verificar TypeScript
npx tsc --noEmit
```

### Erro: "Database connection failed"
- Verificar DATABASE_URL
- Confirmar que IP está na whitelist do Supabase

## 📞 Suporte

Email: contacto@merkai.ao
