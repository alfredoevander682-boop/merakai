"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPortalRedirect() {
  const router = useRouter();
  useEffect(() => {
    // Redireciona para o painel administrativo real
    router.replace("/admin");
  }, [router]);

  return null;
}
