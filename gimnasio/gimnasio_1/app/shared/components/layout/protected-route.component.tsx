import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/auth-context';
import Loading from '../feedback/loading.component';

type AllowedRoles = 'CLIENT' | 'TRAINER' | 'ADMIN' | 'ANY';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AllowedRoles[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ['ANY'],
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    } else if (!isLoading && isAuthenticated && userRole) {
      const isAllowed =
        allowedRoles.includes('ANY') || allowedRoles.includes(userRole);

      if (!isAllowed) {
        // Redirect to dashboard if user doesn't have permission
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, router, userRole, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Cargando..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (
    userRole &&
    !allowedRoles.includes('ANY') &&
    !allowedRoles.includes(userRole)
  ) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute; 