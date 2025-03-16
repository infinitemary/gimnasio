import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DashboardLayout from '../../../../components/layouts/dashboard-layout.component';
import MemberForm from '../../../../features/members/components/member-form.component';
import { MembersService } from '../../../../features/members/services/members.service';
import { Member } from '../../../../features/members/types/member.types';
import { NextPageWithLayout } from '../../../_app';
import RouteGuardComponent from '../../../../features/auth/components/route-guard.component';
import { UserRole } from '../../../../features/auth/services/auth.service';

const EditMemberPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const data = await MembersService.getMemberById(id as string);
          setMember(data);
          setError(null);
        } catch (err) {
          setError('Error al cargar los datos del miembro');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMember();
  }, [id]);

  const handleSuccess = () => {
    // Redirigir a la lista de miembros después de editar exitosamente
    router.push('/dashboard/members');
  };

  return (
    <RouteGuardComponent allowedRoles={[UserRole.ADMIN, UserRole.TRAINER]}>
      <>
        <Head>
          <title>Editar Miembro | Cosmos Gym</title>
          <meta name="description" content="Editar información de miembro del gimnasio" />
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
            <h1 className="text-2xl font-bold text-gray-900">Editar Miembro</h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
              <button
                onClick={() => router.push('/dashboard/members')}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Volver a la lista
              </button>
            </div>
          ) : member ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <MemberForm onSuccess={handleSuccess} isEditing={true} initialData={member} />
              </div>
            </div>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p>No se encontró el miembro solicitado.</p>
              <button
                onClick={() => router.push('/dashboard/members')}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
              >
                Volver a la lista
              </button>
            </div>
          )}
        </div>
      </>
    </RouteGuardComponent>
  );
};

EditMemberPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default EditMemberPage; 