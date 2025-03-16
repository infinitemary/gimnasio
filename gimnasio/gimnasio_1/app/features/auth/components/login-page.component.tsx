import React, { useState } from 'react';
import LoginFormComponent from './login-form.component';
import QRScannerComponent from './qr-scanner.component';
import Image from 'next/image';

const LoginPageComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'qr'>('email');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setLoginError(null);
    setLoginSuccess(true);
  };

  const handleLoginError = (error: string) => {
    setLoginError(error);
    setLoginSuccess(false);
  };

  const handleQRSuccess = (memberId: string) => {
    console.log(`Miembro autenticado con ID: ${memberId}`);
    setLoginError(null);
    setLoginSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* Logo placeholder - reemplazar con el logo real del gimnasio */}
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              CG
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Cosmos Gym
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Gestión de Gimnasio
          </p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {loginError}
          </div>
        )}

        {loginSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
            Inicio de sesión exitoso. Redirigiendo...
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'email'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('email')}
            >
              Correo y Contraseña
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'qr'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('qr')}
            >
              Código QR
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'email' ? (
              <LoginFormComponent
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
            ) : (
              <QRScannerComponent
                onSuccess={handleQRSuccess}
                onError={handleLoginError}
              />
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda? Contacta a un administrador
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPageComponent; 