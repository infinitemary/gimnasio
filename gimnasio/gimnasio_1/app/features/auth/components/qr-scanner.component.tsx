import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QRScannerComponentProps {
  onSuccess?: (memberId: string) => void;
  onError?: (error: string) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({
  onSuccess,
  onError
}) => {
  const router = useRouter();
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Simular la verificación de disponibilidad de cámara
  useEffect(() => {
    const checkCamera = async () => {
      try {
        // En una implementación real, aquí verificaríamos si el dispositivo tiene cámara
        // y solicitaríamos permisos
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoInput = devices.some(device => device.kind === 'videoinput');
        setHasCamera(hasVideoInput);
        
        if (!hasVideoInput) {
          setScanError('No se detectó una cámara en este dispositivo.');
          onError?.('No camera detected');
        }
      } catch (error) {
        console.error('Error checking camera:', error);
        setHasCamera(false);
        setScanError('Error al acceder a la cámara.');
        onError?.(error instanceof Error ? error.message : 'Error accessing camera');
      }
    };

    checkCamera();
  }, [onError]);

  const startScanning = async () => {
    if (!hasCamera) return;
    
    setIsScanning(true);
    setScanError(null);
    
    try {
      // En una implementación real, aquí solicitaríamos permisos de cámara
      // y configuraríamos la biblioteca de escaneo de QR
      
      // Simulamos solicitud de permisos
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        // Simulamos un escaneo exitoso después de 3 segundos
        setTimeout(() => {
          handleSuccessfulScan('12345678');
        }, 3000);
      } catch (error) {
        setPermissionDenied(true);
        setScanError('Permiso de cámara denegado. Por favor, habilita el acceso a la cámara.');
        setIsScanning(false);
        onError?.('Camera permission denied');
      }
    } catch (error) {
      setScanError('Error al iniciar el escáner de QR.');
      setIsScanning(false);
      onError?.(error instanceof Error ? error.message : 'Error starting QR scanner');
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    // En una implementación real, aquí detendríamos el escáner y liberaríamos recursos
  };

  const handleSuccessfulScan = (memberId: string) => {
    // Simulamos una autenticación exitosa
    setIsScanning(false);
    localStorage.setItem('userRole', 'member');
    localStorage.setItem('memberId', memberId);
    
    onSuccess?.(memberId);
    router.push('/dashboard/member');
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Acceso con Código QR
      </h2>
      
      {scanError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {scanError}
        </div>
      )}
      
      <div className="flex flex-col items-center">
        {hasCamera === null ? (
          <div className="flex justify-center items-center h-64 w-full bg-gray-100 rounded-lg">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-gray-600">Verificando cámara...</span>
          </div>
        ) : !hasCamera || permissionDenied ? (
          <div className="flex flex-col justify-center items-center h-64 w-full bg-gray-100 rounded-lg">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="mt-4 text-center text-gray-600">
              {permissionDenied 
                ? 'Permiso de cámara denegado. Por favor, habilita el acceso a la cámara y recarga la página.'
                : 'No se detectó una cámara en este dispositivo. Por favor, utiliza otro método de inicio de sesión.'}
            </p>
          </div>
        ) : isScanning ? (
          <div className="relative">
            <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden">
              {/* Aquí iría el componente de vista previa de la cámara en una implementación real */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white rounded-lg"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-1 bg-red-500 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p className="bg-black bg-opacity-50 p-2 rounded">Escaneando...</p>
              </div>
            </div>
            <button
              onClick={stopScanning}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1zM13 12a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-3zm1 2v1h1v-1h-1z" clipRule="evenodd" />
              </svg>
              <p className="mt-2 text-gray-600">Escanea tu código QR para acceder</p>
            </div>
            <button
              onClick={startScanning}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar Escaneo
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              O inicia sesión con
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <a
            href="#"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="ml-2">Correo y Contraseña</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default QRScannerComponent; 