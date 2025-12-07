// resources/js/Pages/SuperAdmin/Settings/GeneralEdit.jsx
import React, { useState } from 'react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Save, Settings } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

// Subcomponentes
import GeneralInfoSection from './Components/GeneralInfoSection';
import CurrencySettingsSection from './Components/CurrencySettingsSection';
import MaintenanceSection from './Components/MaintenanceSection';
import PreviewPanel from './Components/PreviewPanel';

const GeneralSettingsEdit = ({ settings, countries }) => {
  const [formData, setFormData] = useState({
    site_name: settings.site_name,
    operating_country_iso2: settings.operating_country_iso2,
    maintenance_mode: settings.maintenance_mode,
    maintenance_message: settings.maintenance_message || 'Estamos en mantenimiento. Vuelve pronto.',
    logo_path: settings.logo_path || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogoPreview = (url) => {
    setLogoPreview(url || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    router.put(route('settings.general.update'), formData, {
      onFinish: () => setIsSubmitting(false),
      onSuccess: () => {
        toast.success('¡Configuración guardada con éxito!', {
          position: "top-center",
          autoClose: 3000,
        });
      },
      onError: (errors) => {
        toast.error('Hubo un error al guardar la configuración');
        console.error('Errores de validación:', errors);
      }
    });
  };

  // Datos para la sección de moneda (solo si los necesitas)
  const [currencyConfig, setCurrencyConfig] = useState({
    // ... tus datos de moneda
  });

  const handleCurrencyChange = (value) => {
    // Lógica para cambiar moneda
  };

  const handleCurrencyInputChange = (field, value) => {
    // Lógica para actualizar configuración de moneda
  };

  return (
    <SuperAdminLayout>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Configuración General</h1>
        </div>
        <p className="text-gray-600">
          Define el país de operación y la apariencia de tu tienda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <GeneralInfoSection
              formData={formData}
              countries={countries}
              onChange={handleChange}
              onLogoPreview={handleLogoPreview}
            />

            {/* Solo incluye esto si realmente necesitas configuración de moneda aquí */}
            {/*
            <CurrencySettingsSection
              config={currencyConfig}
              currencies={[]} // Tus monedas
              onCurrencyChange={handleCurrencyChange}
              onInputChange={handleCurrencyInputChange}
            />
            */}

            <MaintenanceSection
              formData={formData}
              onChange={handleChange}
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <Save className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Guardando...' : 'Guardar Configuración'}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <PreviewPanel
            formData={formData}
            countries={countries}
            logoPreview={logoPreview}
          />
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default GeneralSettingsEdit;
