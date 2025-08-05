# Sistema de Autenticación con NextAuth.js

Este proyecto implementa un sistema completo de autenticación y autorización usando NextAuth.js, manteniendo la arquitectura clean existente.

## Configuración Inicial

### 1. Variables de Entorno

Asegúrate de tener las siguientes variables en tu archivo `.env.local`:

```bash
# URL de la API - Apunta a tu backend API
URL_EDYOF_PLATFORM_API=http://localhost:3001
PREFIX_EDYOF_PLATFORM_API=/api/v1

# NextAuth.js - Esta URL debe apuntar a tu aplicación Next.js (no a la API)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secreto-super-seguro-aqui-cambialo-en-produccion
```

**Importante**: 
- `URL_EDYOF_PLATFORM_API`: URL de tu API backend (puerto donde corre tu API)
- `NEXTAUTH_URL`: URL de tu aplicación Next.js (generalmente puerto 3000)
- En producción, `NEXTAUTH_URL` debe ser la URL pública de tu aplicación

### 2. Dependencias Instaladas

```bash
pnpm add next-auth @next-auth/prisma-adapter
```

## Componentes Principales

### 1. Configuración de NextAuth (`/src/lib/auth.ts`)

- Configura el proveedor de credenciales
- Integra con tus actions existentes (`authLoginAction` y `userWorkspaceAction`)
- Maneja los callbacks de JWT y sesión
- Extiende los tipos de NextAuth para incluir datos personalizados

### 2. API Route (`/src/app/api/auth/[...nextauth]/route.ts`)

- Endpoint automático de NextAuth
- Maneja login, logout y refresh de tokens

### 3. AuthProvider (`/src/providers/auth-provider.tsx`)

- Proveedor de contexto para toda la aplicación
- Envuelve la aplicación en el SessionProvider de NextAuth

### 4. Hooks Personalizados

#### `useAuth()` - Hook principal de autenticación
```typescript
const { 
  isAuthenticated, 
  isLoading, 
  user, 
  accessToken, 
  workspace, 
  login, 
  logout 
} = useAuth();
```

#### `useWorkspace()` - Hook para datos del workspace
```typescript
const { 
  establishment, 
  branchOffice, 
  employee, 
  workspace, 
  isLoaded 
} = useWorkspace();
```

#### `useAccessToken()` - Hook para obtener el token
```typescript
const { accessToken, isReady } = useAccessToken();
```

#### `useAuthenticatedRequest()` - Hook para peticiones HTTP autenticadas
```typescript
const { get, post, put, delete: del, isReady } = useAuthenticatedRequest();

// Ejemplo de uso
const response = await get('/api/products');
const result = await post('/api/products', productData);
```

### 5. Componente ProtectedRoute

Protege rutas que requieren autenticación y/o permisos específicos:

```tsx
<ProtectedRoute requiredRoles={['ADMIN']} requiredPermissions={['CREATE_PRODUCT']}>
  <AdminPanel />
</ProtectedRoute>
```

### 6. Middleware de Autenticación

Protege rutas automáticamente y verifica permisos:

```typescript
// middleware.ts
export default withAuth(/* configuración */);
```

## Cómo Usar el Sistema

### 1. Login

El componente de login ya está actualizado para usar NextAuth:

```typescript
// En tu componente de login
const { login } = useAuth();

const handleLogin = async (email: string, password: string) => {
  const result = await login(email, password);
  if (result.success) {
    // Login exitoso, redirigir
  }
};
```

### 2. Acceso a Datos del Usuario

```typescript
// En cualquier componente
const { user, workspace } = useAuth();

console.log(user.email); // Email del usuario
console.log(user.roles); // Roles del usuario
console.log(workspace.establishment.name); // Nombre del establecimiento
```

### 3. Peticiones Autenticadas

```typescript
// Usar el hook para peticiones autenticadas
const { get, post } = useAuthenticatedRequest();

// GET request
const products = await get('/api/products');

// POST request
const newProduct = await post('/api/products', {
  name: 'Producto',
  price: 100
});
```

### 4. Proteger Páginas

```tsx
// En páginas que requieren autenticación
export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <PageContent />
    </ProtectedRoute>
  );
}

// Para páginas que requieren roles específicos
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRoles={['ADMIN']}>
      <AdminContent />
    </ProtectedRoute>
  );
}
```

### 5. Logout

```typescript
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  // Usuario desconectado automáticamente
};
```

## Persistencia de Datos

### Datos que se Guardan Automáticamente:

1. **AccessToken**: Se guarda en el JWT de NextAuth (cookie segura)
2. **Información del Usuario**: Email, username, roles, permisos
3. **Datos del Workspace**: Establecimiento, sucursal, empleado

### Ventajas:

- **No hay re-fetch**: Los datos del workspace se obtienen una vez al login
- **Disponibles offline**: Los datos están en memoria durante la sesión
- **Automático**: No necesitas manejar el estado manualmente
- **Seguro**: Los tokens se manejan de forma segura por NextAuth

## Flujo de Autenticación

1. **Usuario hace login** → Credentials se envían a NextAuth
2. **NextAuth llama a authorize** → Usa tus actions existentes
3. **authLoginAction** → Obtiene el accessToken
4. **userWorkspaceAction** → Obtiene datos del workspace
5. **JWT se crea** → Con accessToken y datos del workspace
6. **Sesión se establece** → Datos disponibles en toda la app
7. **Peticiones automáticas** → Usan el accessToken automáticamente

## Ejemplos de Integración

### Actualizar una Action Existente

```typescript
// Antes: Recibía accessToken manualmente
export async function userWorkspaceAction(dto: AuthAccesTokenDTO) {
  // ...
}

// Ahora: Puede usar el hook en el frontend
const { workspace } = useWorkspace(); // Datos ya disponibles
```

### Crear Nuevas Peticiones

```typescript
// Nuevo hook personalizado
export function useProducts() {
  const { get } = useAuthenticatedRequest();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await get('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    
    fetchProducts();
  }, []);

  return products;
}
```

## Consideraciones de Seguridad

1. **NEXTAUTH_SECRET**: Cambia en producción
2. **HTTPS**: Requerido en producción
3. **Token Expiration**: Configurado a 24 horas
4. **Roles y Permisos**: Verificados en middleware y componentes

## Migración de Código Existente

### Hooks Anteriores
```typescript
// Antes
const { token } = useOldAuth();

// Ahora
const { accessToken } = useAccessToken();
```

### Actions
```typescript
// Antes: Pasabas el token manualmente
const result = await someAction({ accessToken: token });

// Ahora: Usa el hook para peticiones
const { post } = useAuthenticatedRequest();
const result = await post('/api/endpoint', data);
```

Este sistema mantiene tu arquitectura clean existente mientras añade un sistema robusto de autenticación y autorización.
