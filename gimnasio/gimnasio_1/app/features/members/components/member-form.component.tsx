import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  MemberFormData, 
  MemberRole, 
  MemberStatus, 
  MembershipPlan 
} from '../types/member.types';
import { MembersService } from '../services/members.service';

interface MemberFormProps {
  initialData?: MemberFormData;
  isEditing?: boolean;
  onSuccess?: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ 
  initialData, 
  isEditing = false,
  onSuccess
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<MemberFormData>({
    firstName: '',
    lastName: '',
    documentId: '',
    email: '',
    phone: '',
    birthDate: '',
    role: 'client',
    status: 'active',
    membershipPlan: 'basic',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Cargar datos iniciales si se proporcionan
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Asegurarse de que emergencyContact existe
        emergencyContact: initialData.emergencyContact || {
          name: '',
          phone: '',
          relationship: ''
        }
      });
    }
  }, [initialData]);
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Manejar campos anidados (emergencyContact)
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact || { name: '', phone: '', relationship: '' },
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validar campos requeridos
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    if (!formData.documentId.trim()) {
      newErrors.documentId = 'La cédula es requerida';
    } else if (!/^\d{7,10}$/.test(formData.documentId)) {
      newErrors.documentId = 'La cédula debe tener entre 7 y 10 dígitos';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'El teléfono debe tener entre 10 y 11 dígitos';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 12) {
        newErrors.birthDate = 'La edad mínima es 12 años';
      } else if (age > 100) {
        newErrors.birthDate = 'La fecha de nacimiento no es válida';
      }
    }
    
    // Validar campos de contacto de emergencia si se proporcionan
    if (formData.emergencyContact?.phone && !/^\d{10,11}$/.test(formData.emergencyContact.phone.replace(/\D/g, ''))) {
      newErrors['emergencyContact.phone'] = 'El teléfono debe tener entre 10 y 11 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      if (isEditing && initialData?.id) {
        // Actualizar miembro existente
        await MembersService.updateMember(initialData.id, formData);
      } else {
        // Crear nuevo miembro
        await MembersService.createMember(formData);
      }
      
      setSubmitSuccess(true);
      
      // Llamar a la función de éxito si se proporciona
      if (onSuccess) {
        onSuccess();
      } else {
        // Esperar un momento para mostrar el mensaje de éxito
        setTimeout(() => {
          router.push('/dashboard/members');
        }, 1500);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al guardar los datos');
      console.error('Error al guardar el miembro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Cancelar y volver a la lista
  const handleCancel = () => {
    router.push('/dashboard/members');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información personal */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>
          
          <div>
            <label htmlFor="documentId" className="block text-sm font-medium text-gray-700 mb-1">
              Cédula <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="documentId"
              name="documentId"
              value={formData.documentId}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.documentId ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.documentId && <p className="mt-1 text-sm text-red-500">{errors.documentId}</p>}
          </div>
          
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Nacimiento <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.birthDate && <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Información de contacto */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>
        
        {/* Contacto de emergencia */}
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-800 mb-2">Contacto de Emergencia</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="emergencyContact.name"
                name="emergencyContact.name"
                value={formData.emergencyContact?.name || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="emergencyContact.phone"
                name="emergencyContact.phone"
                value={formData.emergencyContact?.phone || ''}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${errors['emergencyContact.phone'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['emergencyContact.phone'] && <p className="mt-1 text-sm text-red-500">{errors['emergencyContact.phone']}</p>}
            </div>
            
            <div>
              <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-gray-700 mb-1">
                Relación
              </label>
              <input
                type="text"
                id="emergencyContact.relationship"
                name="emergencyContact.relationship"
                value={formData.emergencyContact?.relationship || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Información de membresía */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Membresía</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rol <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="client">Cliente</option>
              <option value="trainer">Entrenador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="pending">Pendiente</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="membershipPlan" className="block text-sm font-medium text-gray-700 mb-1">
              Plan de Membresía <span className="text-red-500">*</span>
            </label>
            <select
              id="membershipPlan"
              name="membershipPlan"
              value={formData.membershipPlan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="basic">Básico</option>
              <option value="premium">Premium</option>
              <option value="elite">Elite</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Mensajes de error y éxito */}
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p>{submitError}</p>
        </div>
      )}
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <p>Los datos se han guardado correctamente.</p>
        </div>
      )}
      
      {/* Botones de acción */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (
            'Guardar'
          )}
        </button>
      </div>
    </form>
  );
};

export default MemberForm; 