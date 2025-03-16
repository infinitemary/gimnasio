import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Member } from '../types/member.types';
import { MembersService } from '../services/members.service';

interface MemberDetailProps {
  memberId: string;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ memberId }) => {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isRegeneratingQr, setIsRegeneratingQr] = useState(false);
  const [qrRegenerateError, setQrRegenerateError] = useState<string | null>(null);
  const [qrRegenerateSuccess, setQrRegenerateSuccess] = useState(false);
  
  // Cargar los datos del miembro
  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const memberData = await MembersService.getMemberById(memberId);
        setMember(memberData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos del miembro');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMember();
  }, [memberId]);
  
  // Función para refrescar los datos del miembro
  const refreshMember = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const memberData = await MembersService.getMemberById(memberId);
      setMember(memberData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los datos del miembro');
    } finally {
      setLoading(false);
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
  
  // Función para obtener el texto del plan en español
  const getPlanText = (plan: Member['membershipPlan']) => {
    switch (plan) {
      case 'basic':
        return 'Básico';
      case 'premium':
        return 'Premium';
      case 'elite':
        return 'Elite';
      default:
        return 'Desconocido';
    }
  };
  
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
  
  // Navegar a la página de edición
  const handleEdit = () => {
    router.push(`/dashboard/members/edit/${memberId}`);
  };
  
  // Mostrar confirmación de eliminación
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };
  
  // Cancelar eliminación
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  // Confirmar y ejecutar eliminación
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      await MembersService.deleteMember(memberId);
      
      // Redirigir a la lista de miembros
      router.push('/dashboard/members');
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Error al eliminar el miembro');
      setShowDeleteConfirm(false);
      setIsDeleting(false);
    }
  };
  
  // Regenerar código QR
  const handleRegenerateQr = async () => {
    setIsRegeneratingQr(true);
    setQrRegenerateError(null);
    setQrRegenerateSuccess(false);
    
    try {
      await MembersService.regenerateQrCode(memberId);
      setQrRegenerateSuccess(true);
      
      // Refrescar los datos
      refreshMember();
    } catch (err) {
      setQrRegenerateError(err instanceof Error ? err.message : 'Error al regenerar el código QR');
    } finally {
      setIsRegeneratingQr(false);
    }
  };
  
  // Volver a la lista de miembros
  const handleBack = () => {
    router.push('/dashboard/members');
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={handleBack}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }
  
  if (!member) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg">
          <p className="font-bold">Miembro no encontrado</p>
          <p>No se pudo encontrar el miembro solicitado.</p>
          <button
            onClick={handleBack}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cabecera con acciones */}
      <div className="bg-gray-50 p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <button
            onClick={handleBack}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Detalles del Miembro</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
      
      {/* Información principal */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          {/* Columna izquierda: Foto y QR */}
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
            <div className="flex flex-col items-center">
              {/* Foto de perfil */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-cyan-500">
                {member.profilePicture ? (
                  <Image 
                    src={member.profilePicture} 
                    alt={`${member.firstName} ${member.lastName}`}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                    {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                  </div>
                )}
              </div>
              
              {/* Nombre y badges */}
              <h3 className="text-xl font-semibold text-center mb-2">
                {member.firstName} {member.lastName}
              </h3>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(member.role)}`}>
                  {getRoleText(member.role)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(member.status)}`}>
                  {getStatusText(member.status)}
                </span>
              </div>
              
              {/* Código QR */}
              <div className="border border-gray-200 rounded-lg p-4 w-full">
                <h4 className="text-sm font-medium text-gray-700 mb-2 text-center">Código QR</h4>
                <div className="flex justify-center mb-4">
                  {member.qrCode ? (
                    <Image 
                      src={member.qrCode} 
                      alt="Código QR" 
                      width={150} 
                      height={150}
                    />
                  ) : (
                    <div className="w-[150px] h-[150px] bg-gray-100 flex items-center justify-center text-gray-400">
                      No disponible
                    </div>
                  )}
                </div>
                <button
                  onClick={handleRegenerateQr}
                  disabled={isRegeneratingQr}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  {isRegeneratingQr ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-800 mr-2"></div>
                      Regenerando...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Regenerar QR
                    </>
                  )}
                </button>
                {qrRegenerateError && (
                  <p className="mt-2 text-xs text-red-600">{qrRegenerateError}</p>
                )}
                {qrRegenerateSuccess && (
                  <p className="mt-2 text-xs text-green-600">Código QR regenerado con éxito</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Columna derecha: Información detallada */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información personal */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Información Personal</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Fecha de Nacimiento</p>
                    <p className="text-sm font-medium">
                      {member.birthDate ? formatDate(member.birthDate) : 'No especificada'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Documento de Identidad</p>
                    <p className="text-sm font-medium">{member.documentId || 'No especificado'}</p>
                  </div>
                </div>
              </div>
              
              {/* Información de contacto */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Información de Contacto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{member.email || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium">{member.phone || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dirección</p>
                    <p className="text-sm font-medium">{member.address || 'No especificada'}</p>
                  </div>
                </div>
              </div>
              
              {/* Información de membresía */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Información de Membresía</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Plan</p>
                    <p className="text-sm font-medium">{getPlanText(member.membershipPlan)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fecha de Registro</p>
                    <p className="text-sm font-medium">{formatDate(member.registrationDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Última Asistencia</p>
                    <p className="text-sm font-medium">
                      {member.lastAttendance ? formatDate(member.lastAttendance) : 'Nunca'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contacto de emergencia */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Contacto de Emergencia</h4>
                {member.emergencyContact ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Nombre</p>
                      <p className="text-sm font-medium">{member.emergencyContact.name || 'No especificado'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="text-sm font-medium">{member.emergencyContact.phone || 'No especificado'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Relación</p>
                      <p className="text-sm font-medium">{member.emergencyContact.relationship || 'No especificada'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No se ha especificado un contacto de emergencia</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que deseas eliminar a <span className="font-semibold">{member.firstName} {member.lastName}</span>? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Eliminando...
                  </>
                ) : (
                  <>Eliminar</>
                )}
              </button>
            </div>
            {deleteError && (
              <p className="mt-4 text-sm text-red-600">{deleteError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetail; 