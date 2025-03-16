export type MemberRole = 'client' | 'trainer' | 'admin';

export type MemberStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export type MembershipPlan = 'basic' | 'premium' | 'elite';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  documentId: string; // Cédula (8-10 dígitos)
  email: string;
  phone: string;
  birthDate: string;
  registrationDate: string;
  role: MemberRole;
  status: MemberStatus;
  membershipPlan: MembershipPlan;
  qrCode?: string; // URL o datos del código QR
  lastAttendance?: string;
  nextPaymentDate?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  profilePicture?: string;
}

export interface MemberFormData extends Omit<Member, 'id' | 'registrationDate' | 'qrCode'> {
  id?: string;
}

export interface MemberFilters {
  search?: string;
  role?: MemberRole;
  status?: MemberStatus;
  membershipPlan?: MembershipPlan;
}

export interface MembersSortOptions {
  field: keyof Member;
  direction: 'asc' | 'desc';
}

export interface MembersPaginationOptions {
  page: number;
  pageSize: number;
}

export interface MembersQueryOptions {
  filters?: MemberFilters;
  sort?: MembersSortOptions;
  pagination?: MembersPaginationOptions;
} 