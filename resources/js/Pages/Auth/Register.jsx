// resources/js/Pages/Auth/Register.jsx
import React, { useState } from 'react';
import RegistrationLayout from '@/Layouts/RegistrationLayout';
import RoleSelectionStep from '@/Components/Registration/RoleSelectionStep';
import BaseUserFormStep from '@/Components/Registration/BaseUserFormStep';
import RoleSpecificFormStep from '@/Components/Registration/RoleSpecificFormStep';
import { router } from '@inertiajs/react';

// Iconos
import {
  User, Building2, Store, Truck, Package, Globe, Shield
} from 'lucide-react';

const Register = ({ roles }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
    date_of_birth: '',
    company_name: '',
    company_ruc: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_website: '',
    business_license: '',
    company_description: '',
    store_name: '',
    store_category: '',
    store_address: '',
    store_phone: '',
    store_email: '',
    store_hours: '',
    store_description: '',
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

  // ✅ Mapeo basado en los valores de `role.icon` (no role.name)
  const iconMap = {
    User: User,
    Building2: Building2,
    Store: Store,
    Truck: Truck,
    Package: Package,
    Globe: Globe,
    Shield: Shield,
  };

  // ✅ Convierte el string `role.icon` en componente React
  const rolesWithIcons = roles.map(role => ({
    ...role,
    iconComponent: iconMap[role.icon] || User, // ✅ Usa role.icon, no role.name
  }));

  return (
    <RegistrationLayout currentStep={currentStep} totalSteps={3}>
      {currentStep === 1 && (
        <RoleSelectionStep
          roles={rolesWithIcons}
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
          roles={rolesWithIcons}
          formData={formData}
          onInputChange={handleInputChange}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </RegistrationLayout>
  );
};

export default Register;
