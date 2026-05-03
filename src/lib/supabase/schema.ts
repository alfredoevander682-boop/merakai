import { pgTable, serial, varchar, text, integer, boolean, timestamp, jsonb, real, uniqueIndex } from "drizzle-orm/pg-core";

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  logo: varchar("logo", { length: 500 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  coordinates: jsonb("coordinates").$type<{ lat: number; lng: number }>(),
  phone: varchar("phone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  email: varchar("email", { length: 255 }),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  isVerified: boolean("is_verified").default(false),
  productsCount: integer("products_count").default(0),
  openingHours: varchar("opening_hours", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  comparePrice: integer("compare_price"),
  images: jsonb("images").$type<string[]>().default([]),
  category: varchar("category", { length: 100 }),
  subcategory: varchar("subcategory", { length: 100 }),
  storeId: integer("store_id").references(() => stores.id),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  sponsored: boolean("sponsored").default(false),
  tags: jsonb("tags").$type<string[]>().default([]),
  views: integer("views").default(0),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const serviceProviders = pgTable("service_providers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  profession: varchar("profession", { length: 100 }).notNull(),
  photo: varchar("photo", { length: 500 }),
  description: text("description"),
  basePrice: integer("base_price").default(0),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  city: varchar("city", { length: 100 }),
  coordinates: jsonb("coordinates").$type<{ lat: number; lng: number }>(),
  phone: varchar("phone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  email: varchar("email", { length: 255 }),
  services: jsonb("services").$type<string[]>().default([]),
  availability: varchar("availability", { length: 100 }),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 20 }),
  productCount: integer("product_count").default(0),
});

export const featuredSlots = pgTable("featured_slots", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  position: integer("position").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiConversations = pgTable("ai_conversations", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  messages: jsonb("messages").$type<Array<{ role: string; content: string }>>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  uniqueProductEmail: unique({ name: "reviews_product_email_unique", columns: [table.productId, table.email] }),
}));
