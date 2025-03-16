import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../components/layouts/dashboard-layout.component';
import MemberForm from '../../../features/members/components/member-form.component';
import { NextPageWithLayout } from '../../_app';
import RouteGuardComponent from '../../../features/auth/components/route-guard.component';
import { UserRole } from '../../../features/auth/services/auth.service';

const NewMemberPage: NextPageWithLayout = () => {
  const router = useRouter();
  
  const handleSuccess = () => {
    // Después de crear el miembro, redirigimos a la lista
    router.push('/dashboard/members');
  };
  
  return (
    <RouteGuardComponent allowedRoles={[UserRole.ADMIN, UserRole.TRAINER]}>
      <>
        <Head>
          <title>Nuevo Miembro | Cosmos Gym</title>
          <meta name="description" content="Registrar un nuevo miembro en el sistema" />
        </Head>
        
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => router.push('/dashboard/members')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Miembro</h1>
          </div>
          
          <MemberForm onSuccess={handleSuccess} isEditing={false} />
        </div>
      </>
    </RouteGuardComponent>
  );
};

NewMemberPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewMemberPage; 