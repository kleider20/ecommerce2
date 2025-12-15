// resources/js/Pages/Auth/Register.jsx
import React, { useState } from 'react';
import RegistrationLayout from '@/Layouts/RegistrationLayout';
import RoleSelectionStep from '@/Components/Registration/RoleSelectionStep';
import BaseUserFormStep from '@/Components/Registration/BaseUserFormStep';
import RoleSpecificFormStep from '@/Components/Registration/RoleSpecificFormStep';
import { router } from '@inertiajs/react';

const Register = ({ roles }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    // Base user fields
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    // Role-specific fields (inicializa según tus necesidades)
    phone: '',
    address: '',
    date_of_birth: '',
    company_name: '',
    company_ruc: '',
    // ... otros campos
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('register'), {
      ...formData,
      role: selectedRole
    });
  };

  return (
    <RegistrationLayout currentStep={currentStep} totalSteps={3}>
      {currentStep === 1 && (
        <RoleSelectionStep
          roles={roles.map(role => ({
            id: role.name,
            name: role.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `Selecciona el rol de ${role.name}`,
            icon: getRoleIcon(role.name), // Función auxiliar (opcional)
            color: getRoleColor(role.name) // Función auxiliar (opcional)
          }))}
          selectedRole={selectedRole}
          onRoleSelect={setSelectedRole}
          onNext={() => selectedRole && setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <BaseUserFormStep
          formData={formData}
          onInputChange={handleInputChange}
          onBack={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && (
        <RoleSpecificFormStep
          selectedRole={selectedRole}
          roles={roles.map(role => ({ id: role.name, name: role.name }))}
          formData={formData}
          onInputChange={handleInputChange}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </RegistrationLayout>
  );
};

// ✅ Funciones auxiliares para iconos y colores (opcional pero recomendado)
const getRoleIcon = (roleName) => {
  const icons = {
    user: User,
    provider: Building,
    seller: Store,
    delivery: Truck,
    shipping_agency: Package,
    advertiser: Globe,
  };
  return icons[roleName] || User;
};

const getRoleColor = (roleName) => {
  const colors = {
    user: 'bg-blue-100 text-blue-600',
    provider: 'bg-green-100 text-green-600',
    seller: 'bg-purple-100 text-purple-600',
    delivery: 'bg-orange-100 text-orange-600',
    shipping_agency: 'bg-red-100 text-red-600',
    advertiser: 'bg-indigo-100 text-indigo-600',
  };
  return colors[roleName] || 'bg-gray-100 text-gray-600';
};

// Importa los iconos necesarios
import {
  User,
  Building,
  Store,
  Truck,
  Package,
  Globe
} from 'lucide-react';

export default Register;
