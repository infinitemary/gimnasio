import React from 'react';
import Image from 'next/image';
import { Member } from '../types/member.types';

interface MemberCardProps {
  member: Member;
  onClick?: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onClick }) => {
  // Función para obtener el color de fondo según el rol
  const getRoleBadgeColor = (role: Member['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'trainer':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el color de fondo según el estado
  const getStatusBadgeColor = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el texto del rol en español
  const getRoleText = (role: Member['role']) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'trainer':
        return 'Entrenador';
      case 'client':
        return 'Cliente';
      default:
        return 'Desconocido';
    }
  };

  // Función para obtener el texto del estado en español
  const getStatusText = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'pending':
        return 'Pendiente';
      case 'suspended':
        return 'Suspendido';
      default:
        return 'Desconocido';
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-cyan-500">
            {member.profilePicture ? (
              <Image 
                src={member.profilePicture} 
                alt={`${member.firstName} ${member.lastName}`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                {member.firstName.charAt(0)}{member.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{member.firstName} {member.lastName}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(member.role)}`}>
                {getRoleText(member.role)}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(member.status)}`}>
                {getStatusText(member.status)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            <span>Cédula: {member.documentId}</span>
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{member.email}</span>
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{member.phone}</span>
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Registro: {formatDate(member.registrationDate)}</span>
          </p>
          {member.lastAttendance && (
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Última asistencia: {new Date(member.lastAttendance).toLocaleString('es-ES')}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard; 