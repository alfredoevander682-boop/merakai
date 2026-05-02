#!/bin/bash
# MERKAI Setup Script

echo "🚀 MERKAI - Setup Script"
echo "========================"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor instale Node.js 20+"
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Node.js 20+ recomendado. Versão actual: $(node -v)"
fi

# Verificar package manager
if command -v bun &> /dev/null; then
    PKG_MGR="bun"
    echo "✅ Bun detectado"
elif command -v npm &> /dev/null; then
    PKG_MGR="npm"
    echo "✅ NPM detectado"
else
    echo "❌ Nenhum package manager encontrado"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
if [ "$PKG_MGR" = "bun" ]; then
    bun install
else
    npm install
fi

# Verificar .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local não encontrado"
    cp .env.local.example .env.local
    echo "✅ .env.local criado a partir do exemplo"
    echo "⚠️  Por favor edite .env.local com as suas chaves API"
fi

echo ""
echo "✅ Setup completo!"
echo ""
echo "🚀 Para iniciar:"
echo "   $PKG_MGR run dev"
echo ""
echo "📖 Documentação:"
echo "   README.md - Visão geral do projeto"
echo "   DEPLOY.md - Instruções de deploy"
echo "   RESUMO.md - Resumo de arquivos"
echo ""
