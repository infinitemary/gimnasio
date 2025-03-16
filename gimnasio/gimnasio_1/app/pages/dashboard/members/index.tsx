import React from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layouts/dashboard-layout.component';
import MemberList from '../../../features/members/components/member-list.component';
import { NextPageWithLayout } from '../../_app';
import RouteGuardComponent from '../../../features/auth/components/route-guard.component';
import { UserRole } from '../../../features/auth/services/auth.service';

const MembersPage: NextPageWithLayout = () => {
  return (
    <RouteGuardComponent allowedRoles={[UserRole.ADMIN, UserRole.TRAINER]}>
      <>
        <Head>
          <title>Gestión de Miembros | Cosmos Gym</title>
          <meta name="description" content="Administra los miembros del gimnasio" />
        </Head>
        
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Miembros</h1>
            <p className="text-gray-600 mt-1">
              Administra los miembros del gimnasio, visualiza su información y realiza acciones.
            </p>
          </div>
          
          <MemberList />
        </div>
      </>
    </RouteGuardComponent>
  );
};

MembersPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MembersPage; 