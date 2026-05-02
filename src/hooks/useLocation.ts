"use client";

import { useState, useEffect, useCallback } from "react";
import { useMerkaiStore } from "@/lib/store";
import type { UserLocation } from "@/types";

export function useLocation() {
  const { userLocation, setUserLocation } = useMerkaiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocalização não suportada pelo navegador");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: UserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [setUserLocation]);

  // Auto-request on mount if no location
  useEffect(() => {
    if (!userLocation) {
      requestLocation();
    }
  }, [userLocation, requestLocation]);

  return { userLocation, isLoading, error, requestLocation };
}
