import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DashboardLayout from '../../components/layouts/dashboard-layout.component';
import { NextPageWithLayout } from '../_app';
import RouteGuardComponent from '../../features/auth/components/route-guard.component';
import { UserRole } from '../../features/auth/services/auth.service';

const DashboardPage: NextPageWithLayout = () => {
  // Datos de ejemplo para el dashboard
  const stats = [
    { name: 'Miembros Activos', value: '124', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-green-100 text-green-800' },
    { name: 'Asistencias Hoy', value: '28', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', color: 'bg-blue-100 text-blue-800' },
    { name: 'Pagos Pendientes', value: '8', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Nuevos Miembros', value: '12', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'bg-purple-100 text-purple-800' },
  ];
  
  const quickActions = [
    { name: 'Registrar Miembro', href: '/dashboard/members/create', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'bg-cyan-600' },
    { name: 'Registrar Asistencia', href: '/dashboard/attendance/create', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'bg-emerald-600' },
    { name: 'Registrar Pago', href: '/dashboard/payments/create', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-amber-600' },
    { name: 'Ver Reportes', href: '/dashboard/reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-indigo-600' },
  ];
  
  // Datos de ejemplo para actividad reciente
  const recentActivity = [
    { type: 'member', action: 'joined', name: 'María González', time: '5 minutos' },
    { type: 'attendance', action: 'checked-in', name: 'Carlos Rodríguez', time: '15 minutos' },
    { type: 'payment', action: 'paid', name: 'Ana Martínez', amount: '$45.000', time: '1 hora' },
    { type: 'member', action: 'updated', name: 'Juan Pérez', time: '2 horas' },
    { type: 'attendance', action: 'checked-in', name: 'Laura Sánchez', time: '3 horas' },
  ];
  
  return (
    <RouteGuardComponent allowedRoles={[UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER]}>
      <>
        <Head>
          <title>Dashboard | Cosmos Gym</title>
          <meta name="description" content="Panel de control del sistema de gestión de Cosmos Gym" />
        </Head>
        
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Bienvenido al panel de administración de Cosmos Gym
            </p>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className={`rounded-md p-3 ${stat.color}`}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-500">{stat.name}</h2>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Acciones rápidas */}
          <h2 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className={`${action.color} text-white rounded-lg shadow-md p-4 flex items-center transition-transform transform hover:scale-105`}
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
                <span className="font-medium">{action.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Actividad reciente */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Actividad Reciente</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 ${
                      activity.type === 'member' 
                        ? 'bg-purple-100 text-purple-800' 
                        : activity.type === 'attendance' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {activity.type === 'member' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        ) : activity.type === 'attendance' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.name}{' '}
                        <span className="text-gray-500">
                          {activity.action === 'joined' && 'se registró como nuevo miembro'}
                          {activity.action === 'checked-in' && 'registró asistencia'}
                          {activity.action === 'paid' && `realizó un pago de ${activity.amount}`}
                          {activity.action === 'updated' && 'actualizó su información'}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">Hace {activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <Link
                href="/dashboard/activity"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
              >
                Ver toda la actividad
              </Link>
            </div>
          </div>
        </div>
      </>
    </RouteGuardComponent>
  );
};

DashboardPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage; 