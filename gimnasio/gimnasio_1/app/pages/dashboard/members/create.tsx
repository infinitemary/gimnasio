import React from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layouts/dashboard-layout.component';
import { NextPageWithLayout } from '../../_app';
import RegisterMemberComponent from '../../../features/auth/components/register-member.component';
import RouteGuardComponent from '../../../features/auth/components/route-guard.component';
import { UserRole } from '../../../features/auth/services/auth.service';

const CreateMemberPage: NextPageWithLayout = () => {
  const handleSuccess = (memberId: string) => {
    console.log(`Miembro registrado con ID: ${memberId}`);
  };

  const handleError = (error: string) => {
    console.error('Error al registrar miembro:', error);
  };

  return (
    <RouteGuardComponent allowedRoles={[UserRole.ADMIN, UserRole.TRAINER]}>
      <>
        <Head>
          <title>Registrar Nuevo Miembro | Cosmos Gym</title>
          <meta name="description" content="Registra un nuevo miembro en el sistema" />
        </Head>
        
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Miembro</h1>
            <p className="text-gray-600 mt-1">
              Complete el formulario para registrar un nuevo miembro en el gimnasio.
            </p>
          </div>
          
          <RegisterMemberComponent 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </>
    </RouteGuardComponent>
  );
};

CreateMemberPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateMemberPage; 