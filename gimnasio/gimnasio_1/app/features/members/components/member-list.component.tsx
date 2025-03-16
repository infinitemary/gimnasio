import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Member, 
  MemberRole, 
  MemberStatus,
  MembershipPlan
} from '../types/member.types';
import { useMembersData } from '../hooks/use-members-data.hook';
import MemberCard from './member-card.component';

const MemberList: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Usar nuestro hook personalizado para obtener los datos
  const { 
    members, 
    totalMembers, 
    loading, 
    error,
    filters,
    pagination,
    setFilters,
    setPagination
  } = useMembersData();
  
  // Manejar cambios en el término de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Aplicar la búsqueda cuando se presiona Enter o el botón de búsqueda
  const handleSearch = () => {
    setFilters({ ...filters, search: searchTerm });
  };
  
  // Manejar la tecla Enter en el campo de búsqueda
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Filtrar por rol
  const handleRoleFilter = (role: MemberRole | '') => {
    setFilters({ 
      ...filters, 
      role: role === '' ? undefined : role 
    });
  };
  
  // Filtrar por estado
  const handleStatusFilter = (status: MemberStatus | '') => {
    setFilters({ 
      ...filters, 
      status: status === '' ? undefined : status 
    });
  };
  
  // Filtrar por plan de membresía
  const handlePlanFilter = (plan: MembershipPlan | '') => {
    setFilters({ 
      ...filters, 
      membershipPlan: plan === '' ? undefined : plan 
    });
  };
  
  // Cambiar de página
  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };
  
  // Navegar al detalle de un miembro
  const handleMemberClick = (memberId: string) => {
    router.push(`/dashboard/members/${memberId}`);
  };
  
  // Navegar a la página de creación de miembro
  const handleCreateMember = () => {
    router.push('/dashboard/members/create');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Gestión de Miembros</h1>
          <button
            onClick={handleCreateMember}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Miembro
          </button>
        </div>
        
        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre, cédula o email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Buscar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                id="role-filter"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={filters.role || ''}
                onChange={(e) => handleRoleFilter(e.target.value as MemberRole | '')}
              >
                <option value="">Todos los roles</option>
                <option value="client">Clientes</option>
                <option value="trainer">Entrenadores</option>
                <option value="admin">Administradores</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="status-filter"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={filters.status || ''}
                onChange={(e) => handleStatusFilter(e.target.value as MemberStatus | '')}
              >
                <option value="">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
                <option value="pending">Pendientes</option>
                <option value="suspended">Suspendidos</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="plan-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Plan
              </label>
              <select
                id="plan-filter"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={filters.membershipPlan || ''}
                onChange={(e) => handlePlanFilter(e.target.value as MembershipPlan | '')}
              >
                <option value="">Todos los planes</option>
                <option value="basic">Básico</option>
                <option value="premium">Premium</option>
                <option value="elite">Elite</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Estado de carga y errores */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p>Error al cargar los miembros: {error.message}</p>
          </div>
        )}
        
        {/* Lista de miembros */}
        {!loading && !error && (
          <>
            {members.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron miembros</h3>
                <p className="text-gray-600">Intenta con otros filtros o crea un nuevo miembro.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <MemberCard 
                    key={member.id} 
                    member={member} 
                    onClick={() => handleMemberClick(member.id)}
                  />
                ))}
              </div>
            )}
            
            {/* Paginación */}
            {members.length > 0 && (
              <div className="flex justify-between items-center mt-6 bg-white rounded-lg shadow-md p-4">
                <div className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(pagination.page - 1) * pagination.pageSize + 1}</span> a <span className="font-medium">
                    {Math.min(pagination.page * pagination.pageSize, totalMembers)}
                  </span> de <span className="font-medium">{totalMembers}</span> resultados
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-3 py-1 rounded-md ${
                      pagination.page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-cyan-600 hover:bg-cyan-50'
                    }`}
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page * pagination.pageSize >= totalMembers}
                    className={`px-3 py-1 rounded-md ${
                      pagination.page * pagination.pageSize >= totalMembers
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-cyan-600 hover:bg-cyan-50'
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemberList; 