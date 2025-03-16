import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterMemberComponentProps {
  onSuccess?: (memberId: string) => void;
  onError?: (error: string) => void;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface MemberFormData {
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  emergencyContact: EmergencyContact;
}

const RegisterMemberComponent: React.FC<RegisterMemberComponentProps> = ({
  onSuccess,
  onError
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<MemberFormData>({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    idNumber?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    address?: string;
    emergencyContact?: {
      name?: string;
      phone?: string;
      relationship?: string;
    };
    general?: string;
  }>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [generatedMemberId, setGeneratedMemberId] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: any = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
      isValid = false;
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'El número de cédula es requerido';
      isValid = false;
    } else if (!/^\d{8,10}$/.test(formData.idNumber.trim())) {
      newErrors.idNumber = 'El número de cédula debe tener entre 8 y 10 dígitos';
      isValid = false;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos';
      isValid = false;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
      isValid = false;
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 12) {
        newErrors.birthDate = 'El miembro debe tener al menos 12 años';
        isValid = false;
      } else if (age > 100) {
        newErrors.birthDate = 'La fecha de nacimiento no es válida';
        isValid = false;
      }
    }

    // Validación de contacto de emergencia
    if (!formData.emergencyContact.name.trim()) {
      if (!newErrors.emergencyContact) newErrors.emergencyContact = {};
      newErrors.emergencyContact.name = 'El nombre del contacto de emergencia es requerido';
      isValid = false;
    }

    if (!formData.emergencyContact.phone.trim()) {
      if (!newErrors.emergencyContact) newErrors.emergencyContact = {};
      newErrors.emergencyContact.phone = 'El teléfono del contacto de emergencia es requerido';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.emergencyContact.phone.trim())) {
      if (!newErrors.emergencyContact) newErrors.emergencyContact = {};
      newErrors.emergencyContact.phone = 'El teléfono debe tener 10 dígitos';
      isValid = false;
    }

    if (!formData.emergencyContact.relationship.trim()) {
      if (!newErrors.emergencyContact) newErrors.emergencyContact = {};
      newErrors.emergencyContact.relationship = 'La relación con el contacto de emergencia es requerida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'emergencyContact') {
        setFormData(prev => ({
          ...prev,
          emergencyContact: {
            ...prev.emergencyContact,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const generateMemberId = (): string => {
    // En una implementación real, esto vendría del backend
    // Por ahora, generamos un ID aleatorio basado en la cédula
    const timestamp = new Date().getTime().toString().slice(-6);
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `M${formData.idNumber.slice(-4)}${timestamp}${randomDigits}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});

    try {
      // Simulamos una llamada a la API para registrar al miembro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generamos un ID de miembro
      const memberId = generateMemberId();
      setGeneratedMemberId(memberId);
      
      // Mostramos el QR generado
      setShowQR(true);
      
      onSuccess?.(memberId);
    } catch (error) {
      setErrors({ 
        general: 'Error al registrar al miembro. Por favor, inténtalo de nuevo.' 
      });
      onError?.(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    router.push('/dashboard/members');
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Registro de Nuevo Miembro
        </h2>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}
        
        {showQR ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                ¡Miembro registrado exitosamente!
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                ID del miembro: {generatedMemberId}
              </p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              {/* Aquí iría el componente real de QR */}
              <div className="w-64 h-64 bg-white p-4 flex items-center justify-center">
                <div className="border-2 border-gray-300 p-4 rounded">
                  <div className="grid grid-cols-5 grid-rows-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-center mt-2 text-sm text-gray-600">
                Código QR para acceso al gimnasio
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => window.print()}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Imprimir QR
              </button>
              <button
                onClick={handleFinish}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Finalizar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                  Número de Cédula *
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.idNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.idNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.birthDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.address ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                disabled={isLoading}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contacto de Emergencia
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="emergencyContact.name"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.emergencyContact?.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.emergencyContact?.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="emergencyContact.phone"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.emergencyContact?.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.emergencyContact?.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-gray-700">
                    Relación *
                  </label>
                  <select
                    id="emergencyContact.relationship"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.emergencyContact?.relationship ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    disabled={isLoading}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Padre/Madre">Padre/Madre</option>
                    <option value="Hijo/Hija">Hijo/Hija</option>
                    <option value="Hermano/Hermana">Hermano/Hermana</option>
                    <option value="Cónyuge">Cónyuge</option>
                    <option value="Amigo/Amiga">Amigo/Amiga</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errors.emergencyContact?.relationship && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.relationship}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registrando...
                  </>
                ) : (
                  'Registrar Miembro'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterMemberComponent; 