import { useState, useEffect, useCallback } from 'react';
import { 
  Member, 
  MembersQueryOptions, 
  MemberFilters,
  MembersSortOptions,
  MembersPaginationOptions
} from '../types/member.types';
import { MembersService } from '../services/members.service';

interface UseMembersDataProps {
  initialFilters?: MemberFilters;
  initialSort?: MembersSortOptions;
  initialPagination?: MembersPaginationOptions;
}

interface UseMembersDataReturn {
  members: Member[];
  totalMembers: number;
  loading: boolean;
  error: Error | null;
  filters: MemberFilters;
  sort: MembersSortOptions;
  pagination: MembersPaginationOptions;
  setFilters: (filters: MemberFilters) => void;
  setSort: (sort: MembersSortOptions) => void;
  setPagination: (pagination: MembersPaginationOptions) => void;
  refreshData: () => Promise<void>;
}

export const useMembersData = ({
  initialFilters = {},
  initialSort = { field: 'lastName', direction: 'asc' },
  initialPagination = { page: 1, pageSize: 10 }
}: UseMembersDataProps = {}): UseMembersDataReturn => {
  // Estados para almacenar los datos y el estado de la carga
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Estados para las opciones de consulta
  const [filters, setFilters] = useState<MemberFilters>(initialFilters);
  const [sort, setSort] = useState<MembersSortOptions>(initialSort);
  const [pagination, setPagination] = useState<MembersPaginationOptions>(initialPagination);
  
  // Función para cargar los datos
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const options: MembersQueryOptions = {
        filters,
        sort,
        pagination
      };
      
      const { members: fetchedMembers, total } = await MembersService.getMembers(options);
      
      setMembers(fetchedMembers);
      setTotalMembers(total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido al cargar los miembros'));
      console.error('Error al cargar los miembros:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, sort, pagination]);
  
  // Cargar datos cuando cambian las opciones de consulta
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Función para actualizar los filtros y resetear la paginación
  const handleSetFilters = useCallback((newFilters: MemberFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Volver a la primera página al filtrar
  }, []);
  
  // Función para actualizar el ordenamiento
  const handleSetSort = useCallback((newSort: MembersSortOptions) => {
    setSort(newSort);
  }, []);
  
  // Función para actualizar la paginación
  const handleSetPagination = useCallback((newPagination: MembersPaginationOptions) => {
    setPagination(newPagination);
  }, []);
  
  // Función para refrescar los datos manualmente
  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);
  
  return {
    members,
    totalMembers,
    loading,
    error,
    filters,
    sort,
    pagination,
    setFilters: handleSetFilters,
    setSort: handleSetSort,
    setPagination: handleSetPagination,
    refreshData
  };
}; 