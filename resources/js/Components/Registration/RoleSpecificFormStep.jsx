// components/Registration/RoleSpecificFormStep.jsx
import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import RegularUserForm from '@/Components/Registration/Forms/RegularUserForm';
import ProviderForm from '@/Components/Registration/Forms/ProviderForm';
import SellerForm from '@/Components/Registration/Forms/SellerForm';

const RoleSpecificFormStep = ({
  selectedRole,
  roles,
  formData,
  onInputChange,
  onBack,
  onSubmit
}) => {
  const selectedRoleData = roles.find(role => role.id === selectedRole);
  if (!selectedRoleData) return null;

  const renderFormByRole = () => {
    switch (selectedRole) {
      case 'user':
        return <RegularUserForm formData={formData} onInputChange={onInputChange} />;
      case 'provider':
        return <ProviderForm formData={formData} onInputChange={onInputChange} />;
      case 'seller':
        return <SellerForm formData={formData} onInputChange={onInputChange} />;
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h3>
            <p className="text-gray-600">Esta sección estará disponible próximamente</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRoleData.color}`}>
          <selectedRoleData.icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{selectedRoleData.name}</h3>
          <p className="text-sm text-gray-600">{selectedRoleData.description}</p>
        </div>
      </div>

      {renderFormByRole()}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Atrás
        </button>
        <button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <CheckCircle className="w-5 h-5" />
          Registrar cuenta
        </button>
      </div>
    </div>
  );
};

export default RoleSpecificFormStep;
