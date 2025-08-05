import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authLoginAction } from "@/features/auth/actions/auth-login.action";
import { userWorkspaceAction } from "@/features/auth/actions/user-workspace.action";
import { AuthLoginDTO } from "@/features/auth/application/dtos/auth.login.dto";
import { UserWorkspaceResponseDTO } from "@/features/auth/application/dtos/user-workspace-response.dto";

// Extender los tipos de NextAuth para incluir nuestros datos personalizados
declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      email: string;
      username: string;
      roles: string[];
      permissions: string[];
    };
    workspace: UserWorkspaceResponseDTO;
  }

  interface JWT {
    accessToken: string;
    workspace: UserWorkspaceResponseDTO;
    user: {
      id: string;
      email: string;
      username: string;
      roles: string[];
      permissions: string[];
    };
  }

  interface User {
    accessToken: string;
    workspace: UserWorkspaceResponseDTO;
    id: string;
    email: string;
    username: string;
    roles: string[];
    permissions: string[];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales requeridas");
        }

        try {
          // Usar tu action existente para el login
          const loginDTO: AuthLoginDTO = {
            email: credentials.email,
            password: credentials.password,
          };

          console.log('🔐 Intentando login con:', { email: credentials.email });
          const loginResult = await authLoginAction(loginDTO);

          if (!loginResult.ok || !loginResult.value) {
            const errorMessage = loginResult.error?.message;
            const message = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage || "Error en el login";
            console.error('❌ Error en login:', message);
            throw new Error(message);
          }

          const accessToken = loginResult.value.accessToken;
          console.log('✅ Login exitoso, obteniendo workspace info...');

          // Obtener la información del workspace usando el accessToken
          const workspaceResult = await userWorkspaceAction({ accessToken });

          if (!workspaceResult.ok || !workspaceResult.value) {
            const errorMessage = workspaceResult.error?.message;
            const message = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage || "Error obteniendo información del workspace";
            console.error('❌ Error obteniendo workspace:', message);
            console.error('Error completo:', workspaceResult.error);
            throw new Error(message);
          }

          const workspace = workspaceResult.value;
          console.log('✅ Workspace obtenido exitosamente');

          // Retornar el usuario con toda la información necesaria
          return {
            id: workspace.user.userId,
            email: workspace.user.email,
            username: workspace.user.username,
            roles: workspace.user.roles,
            permissions: workspace.user.permissions,
            accessToken,
            workspace,
          };
        } catch (error) {
          console.error("Error en autorización:", error);
          throw new Error(error instanceof Error ? error.message : "Error de autenticación");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Cuando el usuario se autentica por primera vez
      if (user) {
        token.accessToken = user.accessToken;
        token.workspace = user.workspace;
        token.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          roles: user.roles,
          permissions: user.permissions,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Enviar propiedades al cliente con validación de tipos
      session.accessToken = token.accessToken as string;
      session.workspace = token.workspace as UserWorkspaceResponseDTO;
      session.user = token.user as {
        id: string;
        email: string;
        username: string;
        roles: string[];
        permissions: string[];
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};
