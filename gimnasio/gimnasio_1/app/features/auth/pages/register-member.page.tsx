import React from 'react';
import RegisterMemberComponent from '../components/register-member.component';
import { useRouter } from 'next/navigation';

const RegisterMemberPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = (memberId: string) => {
    console.log(`Miembro registrado con ID: ${memberId}`);
    // Aquí podrías mostrar una notificación de éxito
  };

  const handleError = (error: string) => {
    console.error('Error al registrar miembro:', error);
    // Aquí podrías mostrar una notificación de error
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Registro de Nuevo Miembro</h1>
        <p className="mt-2 text-gray-600">
          Complete el formulario para registrar un nuevo miembro en el gimnasio.
        </p>
      </div>
      
      <RegisterMemberComponent 
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default RegisterMemberPage; 