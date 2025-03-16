import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginPageComponent from '../../features/auth/components/login-page.component';
import { useAuthContext } from '../../features/auth/providers/auth-provider';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuthContext();

  useEffect(() => {
    // Redirigir si el usuario ya está autenticado
    if (isAuthenticated) {
      switch (userRole) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'trainer':
          router.push('/dashboard/trainer');
          break;
        case 'member':
          router.push('/dashboard/member');
          break;
        default:
          router.push('/dashboard');
      }
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <>
      <Head>
        <title>Iniciar Sesión | Cosmos Gym</title>
        <meta name="description" content="Inicia sesión en Cosmos Gym para acceder a tu cuenta" />
      </Head>
      
      <LoginPageComponent />
    </>
  );
};

export default LoginPage; 