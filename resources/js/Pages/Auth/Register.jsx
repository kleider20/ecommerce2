// // resources/js/Pages/Auth/Register.jsx
// import React, { useState } from 'react';
// import RegistrationLayout from '@/Layouts/RegistrationLayout';
// import RoleSelectionStep from '@/Components/Registration/RoleSelectionStep';
// import BaseUserFormStep from '@/Components/Registration/BaseUserFormStep';
// import RoleSpecificFormStep from '@/Components/Registration/RoleSpecificFormStep';
// import { router, useForm } from '@inertiajs/react';

// // Iconos
// import {
//   User, Building2, Store, Truck, Package, Globe, Shield
// } from 'lucide-react';

// const Register = ({ roles }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedRole, setSelectedRole] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     phone: '',
//     address: '',
//     date_of_birth: '',
//     company_name: '',
//     company_ruc: '',
//     company_address: '',
//     company_phone: '',
//     company_email: '',
//     company_website: '',
//     business_license: '',
//     company_description: '',
//     store_name: '',
//     store_category: '',
//     store_address: '',
//     store_phone: '',
//     store_email: '',
//     store_hours: '',
//     store_description: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.post(route('register'), {
//       ...formData,
//       role: selectedRole
//     });
//   };

//   // ✅ Mapeo basado en los valores de `role.icon` (no role.name)
//   const iconMap = {
//     User: User,
//     Building2: Building2,
//     Store: Store,
//     Truck: Truck,
//     Package: Package,
//     Globe: Globe,
//     Shield: Shield,
//   };

//   // ✅ Convierte el string `role.icon` en componente React
//   const rolesWithIcons = roles.map(role => ({
//     ...role,
//     iconComponent: iconMap[role.icon] || User, // ✅ Usa role.icon, no role.name
//   }));

//   return (
//     <RegistrationLayout currentStep={currentStep} totalSteps={3}>
//       {currentStep === 1 && (
//         <RoleSelectionStep
//           roles={rolesWithIcons}
//           selectedRole={selectedRole}
//           onRoleSelect={setSelectedRole}
//           onNext={() => selectedRole && setCurrentStep(2)}
//         />
//       )}

//       {currentStep === 2 && (
//         <BaseUserFormStep
//           formData={formData}
//           onInputChange={handleInputChange}
//           onBack={() => setCurrentStep(1)}
//           onNext={() => setCurrentStep(3)}
//         />
//       )}

//       {currentStep === 3 && (
//         <RoleSpecificFormStep
//           selectedRole={selectedRole}
//           roles={rolesWithIcons}
//           formData={formData}
//           onInputChange={handleInputChange}
//           onBack={() => setCurrentStep(2)}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </RegistrationLayout>
//   );
// };

// export default Register;


// // resources/js/Pages/Auth/Register.jsx
// import React, { useState, useEffect } from 'react';
// import RegistrationLayout from '@/Layouts/RegistrationLayout';
// import RoleSelectionStep from '@/Components/Registration/RoleSelectionStep';
// import BaseUserFormStep from '@/Components/Registration/BaseUserFormStep';
// import RoleSpecificFormStep from '@/Components/Registration/RoleSpecificFormStep';
// import { router, useForm } from '@inertiajs/react';

// // Iconos
// import {
//   User, Building2, Store, Truck, Package, Globe, Shield
// } from 'lucide-react';

// const Register = ({ roles }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedRole, setSelectedRole] = useState('');

//   const { data, setData, post, processing, errors, reset } = useForm({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     role: '',
//     phone: '',
//     address: '',
//     date_of_birth: '',
//     company_name: '',
//     company_ruc: '',
//     company_address: '',
//     company_phone: '',
//     company_email: '',
//     company_website: '',
//     business_license: '',
//     company_description: '',
//     store_name: '',
//     store_category: '',
//     store_address: '',
//     store_phone: '',
//     store_email: '',
//     store_hours: '',
//     store_description: '',
//     terms_accepted: false,
//   });

//   useEffect(() => {
//     setData('role', selectedRole);
//   }, [selectedRole]);

//   const handleInputChange = (name, value) => {
//     setData(name, value);

//     // Resetear errores cuando el usuario escribe
//   if (errors[name]) {
//     // Inertia no tiene resetError, pero puedes manejarlo en el backend
//   }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route('register'));
//   };

//   const iconMap = {
//     User: User,
//     Building2: Building2,
//     Store: Store,
//     Truck: Truck,
//     Package: Package,
//     Globe: Globe,
//     Shield: Shield,
//   };

//   const rolesWithIcons = roles.map(role => ({
//     ...role,
//     iconComponent: iconMap[role.icon] || User,
//   }));

//   return (
//     <RegistrationLayout currentStep={currentStep} totalSteps={3}>
//       {currentStep === 1 && (
//         <RoleSelectionStep
//           roles={rolesWithIcons}
//           selectedRole={selectedRole}
//           onRoleSelect={setSelectedRole}
//           onNext={() => selectedRole && setCurrentStep(2)}
//           processing={processing}
//         />
//       )}

//       {currentStep === 2 && (
//         <BaseUserFormStep
//           data={data}
//           errors={errors}
//           onInputChange={handleInputChange}
//           onBack={() => setCurrentStep(1)}
//           onNext={() => setCurrentStep(3)}
//           processing={processing}
//         />
//       )}

//       {currentStep === 3 && (
//         <RoleSpecificFormStep
//           selectedRole={selectedRole}
//           roles={rolesWithIcons}
//           data={data}
//           errors={errors}
//           onInputChange={handleInputChange}
//           onBack={() => setCurrentStep(2)}
//           onSubmit={handleSubmit}
//           processing={processing}
//         />
//       )}
//     </RegistrationLayout>
//   );
// };

// export default Register;


// resources/js/Pages/Auth/Register.jsx
import React, { useState, useEffect } from 'react';
import RegistrationLayout from '@/Layouts/RegistrationLayout';
import RoleSelectionStep from '@/Components/Registration/RoleSelectionStep';
import BaseUserFormStep from '@/Components/Registration/BaseUserFormStep';
import RoleSpecificFormStep from '@/Components/Registration/RoleSpecificFormStep';
import { router, useForm } from '@inertiajs/react';

// Iconos
import {
  User, Building2, Store, Package, ChevronLeft, CheckCircle
} from 'lucide-react';

const Register = ({ roles }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    // Paso 1: Datos básicos
    name: '',
    email: '',
    password: '',
    password_confirmation: '',

    // Paso 2: Datos por rol
    role: '',
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

    // Paso 3: Términos
    terms_accepted: false,
  });

  useEffect(() => {
    setData('role', selectedRole);
  }, [selectedRole]);

  const handleInputChange = (name, value) => {
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  const iconMap = {
    User: User,
    Building2: Building2,
    Store: Store,
    Package: Package,
  };

  const rolesWithIcons = roles.map(role => ({
    ...role,
    iconComponent: iconMap[role.icon] || User,
  }));

  // Validación Paso 1 (datos básicos)
  const isStep1Valid = () => {
    return data.name.trim() !== '' &&
           data.email.trim() !== '' &&
           data.password.trim() !== '' &&
           data.password === data.password_confirmation;
  };

  // Validación Paso 2 (datos específicos)
  const isStep2Valid = () => {
    if (!selectedRole) return false;

    if (selectedRole === 'user') {
      return true; // No requiere campos adicionales
    }

    if (selectedRole === 'proveedor') {
      return data.company_name.trim() !== '' &&
             data.company_ruc.trim() !== '' &&
             data.company_address.trim() !== '' &&
             data.company_phone.trim() !== '' &&
             data.company_email.trim() !== '';
    }

    if (selectedRole === 'vendedor') {
      return data.store_name.trim() !== '' &&
             data.store_category.trim() !== '' &&
             data.store_address.trim() !== '' &&
             data.store_phone.trim() !== '' &&
             data.store_email.trim() !== '';
    }

    return false;
  };

  // Validación Paso 3 (términos)
  const isStep3Valid = () => {
    return data.terms_accepted === true;
  };

  return (
    <RegistrationLayout
      currentStep={currentStep}
      totalSteps={4}
      showTermsNotice={false}
    >
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
          data={data}
          errors={errors}
          onInputChange={handleInputChange}
          onBack={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
          isStepValid={isStep1Valid()}
          processing={processing}
        />
      )}

      {currentStep === 3 && (
        <RoleSpecificFormStep
          selectedRole={selectedRole}
          roles={rolesWithIcons}
          data={data}
          errors={errors}
          onInputChange={handleInputChange}
          onBack={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
          isStepValid={isStep2Valid()}
          processing={processing}
        />
      )}

      {currentStep === 4 && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Términos y Condiciones</h2>
            <p className="text-gray-600">Por favor, revisa y acepta nuestros términos para continuar</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={data.terms_accepted}
                onChange={(e) => handleInputChange('terms_accepted', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">
                  Acepto los Términos de Servicio y la Política de Privacidad
                </span>
                <br />
                Al marcar esta casilla, confirmo que he leído y acepto los términos establecidos.
              </label>
            </div>
          </div>

          {errors.terms_accepted && (
            <p className="text-red-500 text-sm text-center">{errors.terms_accepted}</p>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Atrás
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isStep3Valid() || processing}
              className={`font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg ${
                isStep3Valid() && !processing
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {processing ? 'Registrando...' : 'Registrar cuenta'}
            </button>
          </div>
        </div>
      )}
    </RegistrationLayout>
  );
};

export default Register;
