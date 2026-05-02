import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MERKAI — Encontre Produtos e Serviços em Angola",
    template: "%s | MERKAI",
  },
  description:
    "Descubra produtos, compare preços e encontre lojas e prestadores de serviços perto de si em Angola. Sem conta, sem complicação.",
  keywords: [
    "marketplace",
    "Angola",
    "Luanda",
    "produtos",
    "serviços",
    "lojas",
    "compras",
    "preços",
  ],
  authors: [{ name: "MERKAI" }],
  creator: "MERKAI",
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "https://merkai.ao",
    siteName: "MERKAI",
    title: "MERKAI — Encontre Produtos e Serviços em Angola",
    description:
      "Descubra produtos, compare preços e encontre lojas e prestadores de serviços perto de si.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MERKAI — Encontre Produtos e Serviços em Angola",
    description: "Descubra produtos, compare preços e encontre lojas perto de si.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-AO" className={inter.variable}>
      <body className="min-h-screen bg-white antialiased">
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-300px)]">{children}</main>
          <Footer />
          <AIChat />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                border: "none",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
