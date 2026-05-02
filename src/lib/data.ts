import type { Product, Store, ServiceProvider, Category } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Alimentação", slug: "alimentacao", icon: "UtensilsCrossed", color: "#EF4444", productCount: 1240 },
  { id: "2", name: "Electrónica", slug: "electronica", icon: "Smartphone", color: "#3B82F6", productCount: 856 },
  { id: "3", name: "Moda", slug: "moda", icon: "Shirt", color: "#8B5CF6", productCount: 2100 },
  { id: "4", name: "Casa", slug: "casa", icon: "Home", color: "#10B981", productCount: 670 },
  { id: "5", name: "Automóvel", slug: "automovel", icon: "Car", color: "#F59E0B", productCount: 430 },
  { id: "6", name: "Serviços", slug: "servicos", icon: "Wrench", color: "#6B7280", productCount: 320 },
  { id: "7", name: "Saúde", slug: "saude", icon: "Heart", color: "#EC4899", productCount: 290 },
  { id: "8", name: "Desporto", slug: "desporto", icon: "Dumbbell", color: "#14B8A6", productCount: 180 },
];

export const stores: Store[] = [
  {
    id: "s1",
    name: "Nova Electrónica",
    slug: "nova-electronica",
    description: "Líder em electrónica em Luanda. Smartphones, laptops, acessórios.",
    address: "Avenida Revolução de Outubro, 123, Maianga",
    city: "Luanda",
    coordinates: { lat: -8.8383, lng: 13.2344 },
    phone: "+244 923 456 789",
    whatsapp: "+244 923 456 789",
    email: "contacto@novaelectronica.ao",
    rating: 4.7,
    reviewCount: 234,
    isVerified: true,
    productsCount: 340,
    openingHours: "Seg-Sáb: 08:00 - 20:00",
  },
  {
    id: "s2",
    name: "Supermercado Kilamba",
    slug: "supermercado-kilamba",
    description: "O melhor supermercado do Kilamba. Produtos frescos e importados.",
    address: "Rua do Comércio, 45, Kilamba",
    city: "Luanda",
    coordinates: { lat: -8.9444, lng: 13.2917 },
    phone: "+244 924 123 456",
    whatsapp: "+244 924 123 456",
    rating: 4.5,
    reviewCount: 189,
    isVerified: true,
    productsCount: 1200,
    openingHours: "Seg-Dom: 07:00 - 22:00",
  },
  {
    id: "s3",
    name: "Moda Express",
    slug: "moda-express",
    description: "Tendências de moda a preços acessíveis. Roupa para toda a família.",
    address: "Avenida 4 de Fevereiro, 789, Ingombotas",
    city: "Luanda",
    coordinates: { lat: -8.8167, lng: 13.2333 },
    phone: "+244 925 789 012",
    rating: 4.2,
    reviewCount: 156,
    isVerified: true,
    productsCount: 560,
    openingHours: "Seg-Sáb: 09:00 - 19:00",
  },
  {
    id: "s4",
    name: "Casa & Conforto",
    slug: "casa-conforto",
    description: "Tudo para sua casa. Móveis, decoração, utensílios.",
    address: "Rua Amílcar Cabral, 234, Talatona",
    city: "Luanda",
    coordinates: { lat: -8.9167, lng: 13.1833 },
    phone: "+244 926 345 678",
    rating: 4.4,
    reviewCount: 98,
    isVerified: false,
    productsCount: 230,
    openingHours: "Seg-Sáb: 08:30 - 18:00",
  },
  {
    id: "s5",
    name: "Auto Peças Luanda",
    slug: "auto-pecas-luanda",
    description: "Peças e acessórios automotivos. Melhores preços garantidos.",
    address: "Avenida Fidel Castro, 567, Viana",
    city: "Luanda",
    coordinates: { lat: -8.9033, lng: 13.3742 },
    phone: "+244 927 567 890",
    rating: 4.1,
    reviewCount: 67,
    isVerified: true,
    productsCount: 180,
    openingHours: "Seg-Sáb: 08:00 - 17:00",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "iPhone 16 Pro Max 256GB",
    description: "O mais recente iPhone com chip A18 Pro, câmara de 48MP e ecrã Super Retina XDR.",
    price: 1450000,
    comparePrice: 1600000,
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
      "https://images.unsplash.com/photo-1696446702181-3b77ebb6c4ce?w=800&q=80",
    ],
    category: "Electrónica",
    subcategory: "Telemóveis",
    store: stores[0],
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    featured: true,
    sponsored: true,
    tags: ["apple", "smartphone", "premium"],
    createdAt: "2026-04-15",
    views: 1200,
  },
  {
    id: "p2",
    name: "Samsung Galaxy S25 Ultra",
    description: "Smartphone Android premium com S Pen, câmara de 200MP e bateria de 5000mAh.",
    price: 1200000,
    comparePrice: 1350000,
    images: [
      "https://images.unsplash.com/photo-1610945265078-3858a0b5d8f4?w=800&q=80",
    ],
    category: "Electrónica",
    subcategory: "Telemóveis",
    store: stores[0],
    rating: 4.7,
    reviewCount: 32,
    inStock: true,
    featured: true,
    sponsored: false,
    tags: ["samsung", "android", "premium"],
    createdAt: "2026-04-10",
    views: 980,
  },
  {
    id: "p3",
    name: "Arroz Jasmine 5kg",
    description: "Arroz jasmine tailandês de alta qualidade. Grão longo e aromático.",
    price: 8500,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    ],
    category: "Alimentação",
    subcategory: "Grãos",
    store: stores[1],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    featured: true,
    sponsored: false,
    tags: ["arroz", "alimentação", "básico"],
    createdAt: "2026-04-20",
    views: 2100,
  },
  {
    id: "p4",
    name: "Óleo de Palma 5L",
    description: "Óleo de palma refinado de alta qualidade. Ideal para cozinha.",
    price: 12000,
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
    ],
    category: "Alimentação",
    subcategory: "Óleos",
    store: stores[1],
    rating: 4.3,
    reviewCount: 67,
    inStock: true,
    featured: false,
    sponsored: false,
    tags: ["óleo", "cozinha", "básico"],
    createdAt: "2026-04-18",
    views: 1500,
  },
  {
    id: "p5",
    name: "Tênis Nike Air Max 2026",
    description: "Tênis desportivo com tecnologia Air Max. Conforto e estilo.",
    price: 45000,
    comparePrice: 55000,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    category: "Moda",
    subcategory: "Calçado",
    store: stores[2],
    rating: 4.5,
    reviewCount: 23,
    inStock: true,
    featured: true,
    sponsored: true,
    tags: ["nike", "tênis", "desporto"],
    createdAt: "2026-04-12",
    views: 750,
  },
  {
    id: "p6",
    name: "Camisa Social Premium",
    description: "Camisa social 100% algodão egípcio. Corte slim fit.",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    category: "Moda",
    subcategory: "Roupa",
    store: stores[2],
    rating: 4.2,
    reviewCount: 18,
    inStock: true,
    featured: false,
    sponsored: false,
    tags: ["camisa", "formal", "moda"],
    createdAt: "2026-04-08",
    views: 420,
  },
  {
    id: "p7",
    name: "Sofá 3 Lugares Moderno",
    description: "Sofá moderno em tecido premium. Conforto e elegância para sua sala.",
    price: 185000,
    comparePrice: 220000,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Casa",
    subcategory: "Móveis",
    store: stores[3],
    rating: 4.6,
    reviewCount: 12,
    inStock: true,
    featured: true,
    sponsored: false,
    tags: ["sofá", "móveis", "sala"],
    createdAt: "2026-04-05",
    views: 380,
  },
  {
    id: "p8",
    name: "Jogo de Panelas Antiaderentes",
    description: "Conjunto de 5 panelas com revestimento antiaderente de cerâmica.",
    price: 32000,
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
    ],
    category: "Casa",
    subcategory: "Cozinha",
    store: stores[3],
    rating: 4.4,
    reviewCount: 34,
    inStock: true,
    featured: false,
    sponsored: false,
    tags: ["panelas", "cozinha", "utensílios"],
    createdAt: "2026-04-14",
    views: 290,
  },
  {
    id: "p9",
    name: "Bateria de Carro 60Ah",
    description: "Bateria de carro de alto desempenho. Durabilidade garantida.",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    ],
    category: "Automóvel",
    subcategory: "Peças",
    store: stores[4],
    rating: 4.1,
    reviewCount: 28,
    inStock: true,
    featured: false,
    sponsored: false,
    tags: ["bateria", "carro", "peças"],
    createdAt: "2026-04-16",
    views: 340,
  },
  {
    id: "p10",
    name: "MacBook Pro M4 14\"",
    description: "MacBook Pro com chip M4, 16GB RAM, 512GB SSD. Potência profissional.",
    price: 2100000,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    ],
    category: "Electrónica",
    subcategory: "Computadores",
    store: stores[0],
    rating: 4.9,
    reviewCount: 15,
    inStock: true,
    featured: true,
    sponsored: true,
    tags: ["apple", "laptop", "profissional"],
    createdAt: "2026-04-01",
    views: 890,
  },
  {
    id: "p11",
    name: "Feijão Gorgongozo 1kg",
    description: "Feijão gorgongozo seleccionado. Grão uniforme e saboroso.",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1515543909159-1f0c8c0d2b5f?w=800&q=80",
    ],
    category: "Alimentação",
    subcategory: "Grãos",
    store: stores[1],
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    featured: false,
    sponsored: false,
    tags: ["feijão", "alimentação", "básico"],
    createdAt: "2026-04-19",
    views: 1800,
  },
  {
    id: "p12",
    name: "Smart TV Samsung 55\" 4K",
    description: "Smart TV 4K UHD com Tizen OS. Streaming e jogos.",
    price: 380000,
    comparePrice: 450000,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    ],
    category: "Electrónica",
    subcategory: "TV",
    store: stores[0],
    rating: 4.6,
    reviewCount: 41,
    inStock: true,
    featured: true,
    sponsored: false,
    tags: ["tv", "samsung", "4k"],
    createdAt: "2026-04-11",
    views: 670,
  },
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: "sp1",
    name: "Carlos Manuel",
    profession: "Canalizador",
    description: "Canalizador profissional com 15 anos de experiência. Reparações e instalações.",
    basePrice: 15000,
    rating: 4.8,
    reviewCount: 56,
    city: "Luanda",
    coordinates: { lat: -8.8390, lng: 13.2350 },
    phone: "+244 923 111 222",
    whatsapp: "+244 923 111 222",
    services: ["Reparação de fugas", "Instalação sanitária", "Desentupimento"],
    availability: "Seg-Sáb: 07:00 - 19:00",
    isVerified: true,
  },
  {
    id: "sp2",
    name: "Maria Fernandes",
    profession: "Eletricista",
    description: "Eletricista licenciada. Instalações residenciais e comerciais.",
    basePrice: 12000,
    rating: 4.6,
    reviewCount: 43,
    city: "Luanda",
    coordinates: { lat: -8.8450, lng: 13.2400 },
    phone: "+244 924 333 444",
    services: ["Instalação elétrica", "Reparação", "Quadros eléctricos"],
    availability: "Seg-Sáb: 08:00 - 18:00",
    isVerified: true,
  },
  {
    id: "sp3",
    name: "João Pedro",
    profession: "Mecânico",
    description: "Mecânico automotivo especializado em diagnóstico eletrónico.",
    basePrice: 25000,
    rating: 4.5,
    reviewCount: 38,
    city: "Luanda",
    coordinates: { lat: -8.9050, lng: 13.3750 },
    phone: "+244 925 555 666",
    services: ["Diagnóstico", "Revisão", "Reparação de motor"],
    availability: "Seg-Sáb: 08:00 - 17:00",
    isVerified: true,
  },
  {
    id: "sp4",
    name: "Ana Beatriz",
    profession: "Designer de Interiores",
    description: "Designer com portefólio internacional. Transforme seu espaço.",
    basePrice: 50000,
    rating: 4.9,
    reviewCount: 29,
    city: "Luanda",
    coordinates: { lat: -8.9180, lng: 13.1850 },
    phone: "+244 926 777 888",
    services: ["Consultoria", "Projeto 3D", "Acompanhamento de obra"],
    availability: "Seg-Sex: 09:00 - 17:00",
    isVerified: true,
  },
];

export const quickSearches = [
  "Telemóveis",
  "Arroz",
  "Canalizador perto",
  "Sofá",
  "Tênis",
  "Peças de carro",
];

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured).sort((a, b) => b.views - a.views);
}

export function getSponsoredProducts(): Product[] {
  return products.filter((p) => p.sponsored);
}

export function getPopularProducts(): Product[] {
  return [...products].sort((a, b) => b.views - a.views).slice(0, 8);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug);
}

export function getStoreProducts(storeId: string): Product[] {
  return products.filter((p) => p.store.id === storeId);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getServiceProviders(): ServiceProvider[] {
  return serviceProviders;
}
