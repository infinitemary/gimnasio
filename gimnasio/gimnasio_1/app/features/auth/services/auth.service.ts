// Tipos de usuario
export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  MEMBER = 'member'
}

// Interfaces para los datos de autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  error?: string;
}

export interface QRAuthResponse {
  success: boolean;
  memberId?: string;
  error?: string;
}

export interface RegisterMemberData {
  firstName: string;
  lastName: string;
  idNumber: string;
  email?: string;
  phone: string;
  birthDate: string;
  address?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface RegisterMemberResponse {
  success: boolean;
  memberId?: string;
  qrCode?: string;
  error?: string;
}

// Clase de servicio de autenticación
class AuthService {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'; // URL base para las peticiones de autenticación
  private token: string | null = null;

  constructor() {
    // Inicializar el token desde localStorage si existe
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  // Método para iniciar sesión con email y contraseña
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // TODO: Reemplazar con llamada real a la API cuando esté disponible
      // const response = await fetch(`${this.API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(credentials),
      // });
      // const data = await response.json();
      // if (!response.ok) {
      //   throw new Error(data.message || 'Error al iniciar sesión');
      // }
      // this.setSession(data);
      // return data;

      // Simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulamos verificación de credenciales
      if (credentials.email === 'admin@cosmosgym.com' && credentials.password === 'password') {
        const response: AuthResponse = {
          success: true,
          token: 'admin-token-' + Date.now(),
          user: {
            id: 'admin-1',
            name: 'Administrador',
            email: credentials.email,
            role: UserRole.ADMIN
          }
        };
        this.setSession(response);
        return response;
      } else if (credentials.email === 'trainer@cosmosgym.com' && credentials.password === 'password') {
        const response: AuthResponse = {
          success: true,
          token: 'trainer-token-' + Date.now(),
          user: {
            id: 'trainer-1',
            name: 'Entrenador',
            email: credentials.email,
            role: UserRole.TRAINER
          }
        };
        this.setSession(response);
        return response;
      } else {
        return {
          success: false,
          error: 'Credenciales incorrectas'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Método para autenticar mediante código QR
  async authenticateWithQR(qrCode: string): Promise<QRAuthResponse> {
    try {
      // TODO: Reemplazar con llamada real a la API cuando esté disponible
      // const response = await fetch(`${this.API_URL}/auth/qr`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ qrCode }),
      // });
      // const data = await response.json();
      // if (!response.ok) {
      //   throw new Error(data.message || 'Error al autenticar con QR');
      // }
      // localStorage.setItem('userRole', UserRole.MEMBER);
      // localStorage.setItem('memberId', data.memberId);
      // return data;

      // Simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulamos verificación de QR
      if (qrCode) {
        const memberId = 'member-' + Date.now().toString().slice(-6);
        localStorage.setItem('userRole', UserRole.MEMBER);
        localStorage.setItem('memberId', memberId);
        localStorage.setItem('authToken', `member-token-${memberId}`);
        
        return {
          success: true,
          memberId
        };
      } else {
        return {
          success: false,
          error: 'Código QR inválido'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Método para registrar un nuevo miembro
  async registerMember(data: RegisterMemberData): Promise<RegisterMemberResponse> {
    try {
      // TODO: Reemplazar con llamada real a la API cuando esté disponible
      // const response = await fetch(`${this.API_URL}/members`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.token}`
      //   },
      //   body: JSON.stringify(data),
      // });
      // const responseData = await response.json();
      // if (!response.ok) {
      //   throw new Error(responseData.message || 'Error al registrar miembro');
      // }
      // return responseData;

      // Simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generamos un ID de miembro
      const memberId = `M${data.idNumber.slice(-4)}${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      return {
        success: true,
        memberId,
        qrCode: `qr-${memberId}` // En una implementación real, esto sería una URL o datos para generar el QR
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Método para cerrar sesión
  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('memberId');
      localStorage.removeItem('userData');
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return !!this.token;
  }

  // Método para obtener el rol del usuario actual
  getUserRole(): UserRole | null {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole');
      if (role && Object.values(UserRole).includes(role as UserRole)) {
        return role as UserRole;
      }
    }
    return null;
  }

  // Método para obtener el token actual
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return this.token;
  }

  // Método para obtener los datos del usuario actual
  getUserData(): { id: string; name: string; email: string; role: UserRole } | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          return JSON.parse(userData);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  // Método privado para guardar la sesión
  private setSession(response: AuthResponse): void {
    if (response.token && response.user) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.user.role);
        localStorage.setItem('userData', JSON.stringify(response.user));
      }
    }
  }
}

// Exportamos una instancia única del servicio
export const authService = new AuthService();

export default authService; 