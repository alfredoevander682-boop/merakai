"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Heart,
  User,
  Menu,
  X,
  ShoppingBag,
  Wrench,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMerkaiStore } from "@/lib/store";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/vendedor", label: "Vender" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { userLocation, favorites, toggleAiChat } = useMerkaiStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-white"
        )}
      >
        <div className="merkai-container">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-merkai-blue rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-merkai-black">
                MERKAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-merkai-blue/10 text-merkai-blue"
                      : "text-gray-600 hover:text-merkai-black hover:bg-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar produtos ou serviços..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20 focus:bg-white transition-all"
                  onFocus={() => setIsSearchOpen(true)}
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Location */}
              <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="max-w-[100px] truncate">
                  {userLocation?.city || "Luanda"}
                </span>
              </button>

              {/* Favorites */}
              <Link
                href="/favoritos"
                className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-merkai-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* AI Assistant */}
              <button
                onClick={toggleAiChat}
                className="hidden md:flex p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                title="Assistente IA"
              >
                <Wrench className="w-5 h-5" />
              </button>

              {/* Account */}
              <Link
                href="/conta"
                className="hidden md:flex p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-merkai-blue/20"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[120px] z-40 lg:hidden"
          >
            <div className="bg-white shadow-xl border-t border-gray-100 mx-4 rounded-2xl overflow-hidden">
              <nav className="p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-merkai-blue/10 text-merkai-blue"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {link.label === "Início" && <Store className="w-4 h-4" />}
                    {link.label === "Produtos" && <ShoppingBag className="w-4 h-4" />}
                    {link.label === "Serviços" && <Wrench className="w-4 h-4" />}
                    {link.label === "Vender" && <User className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-gray-100 p-4">
                <button
                  onClick={() => {
                    toggleAiChat();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-merkai-blue/10 text-merkai-blue text-sm font-medium"
                >
                  <Wrench className="w-4 h-4" />
                  Assistente IA
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[120px] lg:h-[72px]" />
    </>
  );
}
