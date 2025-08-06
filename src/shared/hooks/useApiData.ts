"use client";

import { useAuthenticatedRequest } from "@/shared/hooks/useAuthenticatedRequest";
import { useAuth } from "@/shared/hooks/useAuth";
import { useState, useEffect } from "react";

// Ejemplo de hook para usar con cualquier endpoint que requiera autenticación
export function useAuthenticatedData<T>(url: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { get, isReady } = useAuthenticatedRequest();

  useEffect(() => {
    if (!isReady) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await get(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, isReady, ...dependencies]);

  return { data, loading, error, refetch: () => {
    if (isReady) {
      // Re-ejecutar la petición
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await get(url);
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }};
}

// Ejemplo específico para obtener productos
export function useProducts() {
  const { data, loading, error, refetch } = useAuthenticatedData<any[]>("/api/products");
  
  return {
    products: data || [],
    loading,
    error,
    refetch
  };
}

// Ejemplo para crear un producto
export function useCreateProduct() {
  const { post } = useAuthenticatedRequest();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (productData: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await post("/api/products", productData);
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear producto";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error
  };
}
