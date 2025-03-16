import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import authService, { 
  UserRole, 
  LoginCredentials, 
  AuthResponse, 
  QRAuthResponse,
  RegisterMemberData,
  RegisterMemberResponse
} from '../services/auth.service';

export interface UseAuthReturn {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  authenticateWithQR: (qrCode: string) => Promise<QRAuthResponse>;
  registerMember: (data: RegisterMemberData) => Promise<RegisterMemberResponse>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      const role = authService.getUserRole();
      
      setIsAuthenticated(authenticated);
      setUserRole(role);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        setIsAuthenticated(true);
        setUserRole(response.user?.role || null);
        
        // Redirigir según el rol
        if (response.user?.role === UserRole.ADMIN) {
          router.push('/dashboard/admin');
        } else if (response.user?.role === UserRole.TRAINER) {
          router.push('/dashboard/trainer');
        }
      } else {
        setError(response.error || 'Error al iniciar sesión');
      }
      
      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setIsLoading(false);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [router]);

  // Función para autenticar con QR
  const authenticateWithQR = useCallback(async (qrCode: string): Promise<QRAuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.authenticateWithQR(qrCode);
      
      if (response.success) {
        setIsAuthenticated(true);
        setUserRole(UserRole.MEMBER);
        
        // Redirigir al dashboard de miembro
        router.push('/dashboard/member');
      } else {
        setError(response.error || 'Error al autenticar con QR');
      }
      
      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setIsLoading(false);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [router]);

  // Función para registrar un nuevo miembro
  const registerMember = useCallback(async (data: RegisterMemberData): Promise<RegisterMemberResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.registerMember(data);
      
      if (!response.success) {
        setError(response.error || 'Error al registrar miembro');
      }
      
      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setIsLoading(false);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, []);

  // Función para cerrar sesión
  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    router.push('/login');
  }, [router]);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated,
    userRole,
    isLoading,
    error,
    login,
    authenticateWithQR,
    registerMember,
    logout,
    clearError
  };
};

export default useAuth; 