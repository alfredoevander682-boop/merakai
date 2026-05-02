export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  store: Store;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  sponsored: boolean;
  tags: string[];
  createdAt: string;
  views: number;
  distance?: number;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp?: string;
  email?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  productsCount: number;
  openingHours?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  profession: string;
  photo?: string;
  description: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp?: string;
  email?: string;
  services: string[];
  availability: string;
  isVerified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
}

export interface SearchFilters {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  maxDistance?: number;
  minRating?: number;
  sortBy: "relevance" | "price-asc" | "price-desc" | "distance" | "rating";
  city?: string;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  products?: Product[];
  filters?: Partial<SearchFilters>;
}

export interface FeaturedSlot {
  id: string;
  product: Product;
  position: number;
  expiresAt: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  address?: string;
}
