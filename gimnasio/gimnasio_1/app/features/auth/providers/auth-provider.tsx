import React, { createContext, ReactNode, useContext } from 'react';
import useAuth, { UseAuthReturn } from '../hooks/use-auth.hook';

// Crear el contexto de autenticación
const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Usar el hook useAuth para proporcionar la funcionalidad de autenticación
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuthContext = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext; 