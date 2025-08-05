"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { UserWorkspaceResponseDTO } from "@/features/auth/application/dtos/user-workspace-response.dto";

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error de autenticación",
      };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  return {
    // Estado de autenticación
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    
    // Datos del usuario
    user: session?.user || null,
    accessToken: session?.accessToken || null,
    
    // Datos del workspace (cached)
    workspace: session?.workspace || null,
    
    // Métodos
    login,
    logout,
    
    // Session completa por si necesitas algo más específico
    session,
  };
}

// Hook específico para obtener información del workspace
export function useWorkspace() {
  const { workspace, isAuthenticated } = useAuth();

  return {
    // Información del establecimiento
    establishment: workspace?.establishment || null,
    
    // Información de la sucursal
    branchOffice: workspace?.branchOffice || null,
    
    // Información del empleado
    employee: workspace?.employee || null,
    
    // Workspace completo
    workspace,
    
    // Estado
    isLoaded: isAuthenticated && !!workspace,
  };
}

// Hook para obtener el accessToken para hacer peticiones
export function useAccessToken() {
  const { accessToken, isAuthenticated } = useAuth();
  
  return {
    accessToken,
    isReady: isAuthenticated && !!accessToken,
  };
}
