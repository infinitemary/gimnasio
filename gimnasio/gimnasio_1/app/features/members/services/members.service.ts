import { 
  Member, 
  MemberFormData, 
  MembersQueryOptions 
} from '../types/member.types';

// Datos de ejemplo (mock) para simular una base de datos
const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    documentId: '12345678',
    email: 'juan.perez@example.com',
    phone: '04121234567',
    birthDate: '1990-05-15',
    registrationDate: '2023-01-10',
    role: 'client',
    status: 'active',
    membershipPlan: 'premium',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_1',
    lastAttendance: '2023-03-14T08:30:00',
    nextPaymentDate: '2023-04-10',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'González',
    documentId: '87654321',
    email: 'maria.gonzalez@example.com',
    phone: '04167654321',
    birthDate: '1988-11-23',
    registrationDate: '2023-02-05',
    role: 'client',
    status: 'active',
    membershipPlan: 'basic',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_2',
    lastAttendance: '2023-03-13T17:15:00',
    nextPaymentDate: '2023-04-05',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    documentId: '23456789',
    email: 'carlos.rodriguez@example.com',
    phone: '04245678901',
    birthDate: '1985-07-30',
    registrationDate: '2022-11-15',
    role: 'trainer',
    status: 'active',
    membershipPlan: 'elite',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_3',
    lastAttendance: '2023-03-14T14:00:00',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'Martínez',
    documentId: '34567890',
    email: 'ana.martinez@example.com',
    phone: '04121234567',
    birthDate: '1992-03-12',
    registrationDate: '2023-01-20',
    role: 'admin',
    status: 'active',
    membershipPlan: 'elite',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_4',
    lastAttendance: '2023-03-14T09:45:00',
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '5',
    firstName: 'Pedro',
    lastName: 'Sánchez',
    documentId: '45678901',
    email: 'pedro.sanchez@example.com',
    phone: '04168765432',
    birthDate: '1995-09-08',
    registrationDate: '2023-02-15',
    role: 'client',
    status: 'inactive',
    membershipPlan: 'basic',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_5',
    lastAttendance: '2023-02-28T16:30:00',
    nextPaymentDate: '2023-03-15',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

// Simular un retraso de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Clase de servicio para miembros
export class MembersService {
  // Obtener todos los miembros con opciones de filtrado, ordenamiento y paginación
  static async getMembers(options?: MembersQueryOptions): Promise<{
    members: Member[];
    total: number;
  }> {
    await delay(800); // Simular retraso de red
    
    let filteredMembers = [...MOCK_MEMBERS];
    
    // Aplicar filtros si existen
    if (options?.filters) {
      const { search, role, status, membershipPlan } = options.filters;
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredMembers = filteredMembers.filter(member => 
          member.firstName.toLowerCase().includes(searchLower) ||
          member.lastName.toLowerCase().includes(searchLower) ||
          member.documentId.includes(search) ||
          member.email.toLowerCase().includes(searchLower)
        );
      }
      
      if (role) {
        filteredMembers = filteredMembers.filter(member => member.role === role);
      }
      
      if (status) {
        filteredMembers = filteredMembers.filter(member => member.status === status);
      }
      
      if (membershipPlan) {
        filteredMembers = filteredMembers.filter(member => member.membershipPlan === membershipPlan);
      }
    }
    
    // Aplicar ordenamiento si existe
    if (options?.sort) {
      const { field, direction } = options.sort;
      filteredMembers.sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];
        
        if (valueA === undefined || valueB === undefined) return 0;
        
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Obtener el total antes de aplicar paginación
    const total = filteredMembers.length;
    
    // Aplicar paginación si existe
    if (options?.pagination) {
      const { page, pageSize } = options.pagination;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      filteredMembers = filteredMembers.slice(start, end);
    }
    
    return {
      members: filteredMembers,
      total
    };
  }
  
  // Obtener un miembro por ID
  static async getMemberById(id: string): Promise<Member | null> {
    await delay(500);
    const member = MOCK_MEMBERS.find(m => m.id === id);
    return member || null;
  }
  
  // Crear un nuevo miembro
  static async createMember(memberData: MemberFormData): Promise<Member> {
    await delay(1000);
    
    const newMember: Member = {
      ...memberData,
      id: `${MOCK_MEMBERS.length + 1}`,
      registrationDate: new Date().toISOString().split('T')[0],
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_${MOCK_MEMBERS.length + 1}`
    };
    
    // En un entorno real, aquí enviaríamos los datos al backend
    // Por ahora, solo simulamos que se ha creado
    
    return newMember;
  }
  
  // Actualizar un miembro existente
  static async updateMember(id: string, memberData: MemberFormData): Promise<Member> {
    await delay(1000);
    
    const existingMemberIndex = MOCK_MEMBERS.findIndex(m => m.id === id);
    
    if (existingMemberIndex === -1) {
      throw new Error(`Miembro con ID ${id} no encontrado`);
    }
    
    const updatedMember: Member = {
      ...MOCK_MEMBERS[existingMemberIndex],
      ...memberData,
      id // Aseguramos que el ID no cambie
    };
    
    // En un entorno real, aquí enviaríamos los datos al backend
    // Por ahora, solo simulamos que se ha actualizado
    
    return updatedMember;
  }
  
  // Eliminar un miembro
  static async deleteMember(id: string): Promise<boolean> {
    await delay(800);
    
    const existingMemberIndex = MOCK_MEMBERS.findIndex(m => m.id === id);
    
    if (existingMemberIndex === -1) {
      throw new Error(`Miembro con ID ${id} no encontrado`);
    }
    
    // En un entorno real, aquí enviaríamos la solicitud al backend
    // Por ahora, solo simulamos que se ha eliminado
    
    return true;
  }
  
  // Generar un nuevo código QR para un miembro
  static async regenerateQrCode(id: string): Promise<string> {
    await delay(800);
    
    const existingMemberIndex = MOCK_MEMBERS.findIndex(m => m.id === id);
    
    if (existingMemberIndex === -1) {
      throw new Error(`Miembro con ID ${id} no encontrado`);
    }
    
    // Generar un nuevo QR con timestamp para hacerlo único
    const timestamp = new Date().getTime();
    const newQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=member_${id}_${timestamp}`;
    
    // En un entorno real, aquí enviaríamos la solicitud al backend
    // Por ahora, solo simulamos que se ha regenerado
    
    return newQrCode;
  }
} 