"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Acesso Administrador</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              required
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-merkai-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Palavra‑passe</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-merkai-blue"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-900 text-red-300 rounded-xl text-sm">{error}</div>
          )}
          <Button type="submit" disabled={loading} className="w-full" variant="default">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Acessando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
