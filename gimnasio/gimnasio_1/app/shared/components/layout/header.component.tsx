import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  userRole?: 'CLIENT' | 'TRAINER' | 'ADMIN';
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userRole, userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">
              Cosmos Gym
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                Dashboard
              </Link>
              
              {userRole === 'ADMIN' && (
                <>
                  <Link href="/members" className="hover:text-blue-200 transition-colors">
                    Miembros
                  </Link>
                  <Link href="/promotions" className="hover:text-blue-200 transition-colors">
                    Promociones
                  </Link>
                  <Link href="/events" className="hover:text-blue-200 transition-colors">
                    Eventos
                  </Link>
                </>
              )}
              
              {(userRole === 'TRAINER' || userRole === 'ADMIN') && (
                <Link href="/routines" className="hover:text-blue-200 transition-colors">
                  Rutinas
                </Link>
              )}
              
              {userRole === 'CLIENT' && (
                <>
                  <Link href="/attendance" className="hover:text-blue-200 transition-colors">
                    Asistencia
                  </Link>
                  <Link href="/payments" className="hover:text-blue-200 transition-colors">
                    Pagos
                  </Link>
                  <Link href="/routines" className="hover:text-blue-200 transition-colors">
                    Mis Rutinas
                  </Link>
                </>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {userName ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span>{userName}</span>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d={isMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Handle logout
                        setIsMenuOpen(false);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2">
            <Link 
              href="/dashboard" 
              className="block hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            
            {userRole === 'ADMIN' && (
              <>
                <Link 
                  href="/members" 
                  className="block hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Miembros
                </Link>
                <Link 
                  href="/promotions" 
                  className="block hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Promociones
                </Link>
                <Link 
                  href="/events" 
                  className="block hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Eventos
                </Link>
              </>
            )}
            
            {(userRole === 'TRAINER' || userRole === 'ADMIN') && (
              <Link 
                href="/routines" 
                className="block hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rutinas
              </Link>
            )}
            
            {userRole === 'CLIENT' && (
              <>
                <Link 
                  href="/attendance" 
                  className="block hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Asistencia
                </Link>
                <Link 
                  href="/payments" 
                  className="block hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pagos
                </Link>
                <Link 
                  href="/routines" 
                  className="block hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis Rutinas
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 