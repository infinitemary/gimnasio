# Módulo de Autenticación

Este módulo proporciona la funcionalidad de autenticación y autorización para el sistema de gestión de Cosmos Gym.

## Estructura del Módulo

```
auth/
├── components/           # Componentes de UI para autenticación
│   ├── login-form.component.tsx       # Formulario de login con email/contraseña
│   ├── login-page.component.tsx       # Página completa de login
│   ├── qr-scanner.component.tsx       # Componente para escaneo de QR
│   ├── register-member.component.tsx  # Formulario de registro de miembros
│   └── route-guard.component.tsx      # Componente para protección de rutas
├── hooks/                # Hooks personalizados
│   └── use-auth.hook.ts              # Hook para gestionar la autenticación
├── providers/            # Proveedores de contexto
│   └── auth-provider.tsx             # Proveedor de contexto de autenticación
├── services/             # Servicios
│   └── auth.service.ts               # Servicio de autenticación
└── pages/                # Páginas
    ├── login.page.tsx                # Página de login
    └── register-member.page.tsx      # Página de registro de miembros
```

## Funcionalidades Implementadas

- **Login con Email/Contraseña**: Para administradores y entrenadores
- **Login con QR**: Para miembros del gimnasio
- **Registro de Miembros**: Formulario completo con validación
- **Protección de Rutas**: Basada en roles de usuario
- **Gestión de Sesión**: Almacenamiento y recuperación de tokens

## Integración con Backend

El módulo está preparado para integrarse con un backend real. Actualmente utiliza simulaciones para desarrollo, pero incluye comentarios con el código necesario para realizar las llamadas a la API.

### Endpoints Requeridos

1. **Login**: `POST /api/auth/login`
   - Request: `{ email: string, password: string }`
   - Response: `{ success: boolean, token?: string, user?: { id: string, name: string, email: string, role: string }, error?: string }`

2. **Autenticación QR**: `POST /api/auth/qr`
   - Request: `{ qrCode: string }`
   - Response: `{ success: boolean, memberId?: string, error?: string }`

3. **Registro de Miembros**: `POST /api/members`
   - Request: Datos del miembro (ver interfaz `RegisterMemberData`)
   - Response: `{ success: boolean, memberId?: string, qrCode?: string, error?: string }`

### Variables de Entorno

- `NEXT_PUBLIC_API_URL`: URL base para las peticiones a la API (por defecto: '/api')

## Uso del Módulo

### Protección de Rutas

Para proteger una ruta basada en roles:

```tsx
import RouteGuardComponent from '../features/auth/components/route-guard.component';
import { UserRole } from '../features/auth/services/auth.service';

const ProtectedPage = () => {
  return (
    <RouteGuardComponent allowedRoles={[UserRole.ADMIN, UserRole.TRAINER]}>
      {/* Contenido protegido */}
    </RouteGuardComponent>
  );
};
```

### Uso del Hook de Autenticación

```tsx
import { useAuthContext } from '../features/auth/providers/auth-provider';

const MyComponent = () => {
  const { isAuthenticated, userRole, login, logout } = useAuthContext();
  
  // Usar las funciones y estados según sea necesario
};
```

## Usuarios de Prueba

- **Administrador**: 
  - Email: admin@cosmosgym.com
  - Contraseña: password

- **Entrenador**: 
  - Email: trainer@cosmosgym.com
  - Contraseña: password

- **Miembro**: 
  - Usar el escáner QR (simulado en desarrollo) 