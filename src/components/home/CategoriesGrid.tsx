"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Smartphone,
  Shirt,
  Home,
  Car,
  Wrench,
  Heart,
  Dumbbell,
} from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  Shirt: <Shirt className="w-7 h-7" />,
  Home: <Home className="w-7 h-7" />,
  Car: <Car className="w-7 h-7" />,
  Wrench: <Wrench className="w-7 h-7" />,
  Heart: <Heart className="w-7 h-7" />,
  Dumbbell: <Dumbbell className="w-7 h-7" />,
};

export function CategoriesGrid() {
  return (
    <section className="merkai-container">
      <h2 className="merkai-section-title mb-6">Categorias</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/categoria/${category.slug}`}>
              <div className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-card border border-transparent hover:border-gray-100 transition-all duration-300 cursor-pointer">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: category.color }}
                >
                  {iconMap[category.icon]}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-merkai-black group-hover:text-merkai-blue transition-colors">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {category.productCount.toLocaleString()} items
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
