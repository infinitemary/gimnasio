import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/use-auth.hook';
import { UserRole } from '../services/auth.service';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const RouteGuardComponent: React.FC<RouteGuardProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol adecuado
    const checkAuth = () => {
      if (isLoading) return;

      if (!isAuthenticated) {
        // No autenticado, redirigir a login
        setAuthorized(false);
        router.push('/login');
        return;
      }

      if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
        // No tiene el rol adecuado, redirigir según el rol
        setAuthorized(false);
        
        switch (userRole) {
          case UserRole.ADMIN:
            router.push('/dashboard/admin');
            break;
          case UserRole.TRAINER:
            router.push('/dashboard/trainer');
            break;
          case UserRole.MEMBER:
            router.push('/dashboard/member');
            break;
          default:
            router.push('/login');
        }
        return;
      }

      // Autenticado y con el rol adecuado
      setAuthorized(true);
    };

    checkAuth();
  }, [isAuthenticated, userRole, isLoading, router, allowedRoles]);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Mostrar un mensaje de acceso denegado si no está autorizado
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-md">
          <svg className="h-16 w-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600 mb-4">No tienes permiso para acceder a esta página.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  // Renderizar los hijos si está autorizado
  return <>{children}</>;
};

export default RouteGuardComponent; 