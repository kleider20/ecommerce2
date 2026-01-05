// // resources/js/Pages/User/Settings/PersonalInfoForm.jsx
// import React, { useState } from 'react';
// import { User } from 'lucide-react';

// const PersonalInfoForm = ({ config, onSave }) => {
//   const [formData, setFormData] = useState({ ...config });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <User className="w-5 h-5" />
//           Información Personal
//         </h2>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//         >
//           Guardar cambios
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
//           <input
//             type="text"
//             value={formData.firstName}
//             onChange={(e) => handleChange('firstName', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
//           <input
//             type="text"
//             value={formData.lastName}
//             onChange={(e) => handleChange('lastName', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => handleChange('email', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
//           <input
//             type="tel"
//             value={formData.phone}
//             onChange={(e) => handleChange('phone', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
//           <input
//             type="date"
//             value={formData.birthDate}
//             onChange={(e) => handleChange('birthDate', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
//           <select
//             value={formData.gender}
//             onChange={(e) => handleChange('gender', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="male">Masculino</option>
//             <option value="female">Femenino</option>
//             <option value="other">Otro</option>
//             <option value="prefer-not-to-say">Prefiero no decirlo</option>
//           </select>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PersonalInfoForm;


// resources/js/Pages/User/Settings/PersonalInfoForm.jsx
import React, { useState, useEffect } from 'react';
import { User, Globe, MapPin, Phone, Calendar, CreditCard } from 'lucide-react';
import { router } from '@inertiajs/react';

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    document_type: 'dni',
    document_number: '',
    first_name: '',
    middle_name: '',
    first_surname: '',
    second_surname: '',
    country_id: '',
    state_id: '',
    city: '',
    address: '',
    postal_code: '',
    phone: '',
    date_of_birth: '',
    gender: 'not_specified'
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, countriesRes] = await Promise.all([
          fetch('/api/user/profile'),
          fetch('/api/countries') // Asumiendo que tienes esta ruta
        ]);

        const profileData = await profileRes.json();
        const countriesData = await countriesRes.json();

        setCountries(countriesData);
        setFormData(profileData.profile || {});

        if (profileData.profile?.country_id) {
          loadStates(profileData.profile.country_id);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const loadStates = async (countryId) => {
    try {
      const res = await fetch(`/api/countries/${countryId}/states`);
      const statesData = await res.json();
      setStates(statesData);
    } catch (error) {
      console.error('Error loading states:', error);
      setStates([]);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Si cambia el país, recargar estados
    if (field === 'country_id') {
      loadStates(value);
      setFormData(prev => ({ ...prev, state_id: '', [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('¡Perfil actualizado correctamente!');
      } else {
        const error = await response.json();
        alert('Error: ' + (error.message || 'No se pudo guardar'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar los datos');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <User className="w-5 h-5" />
        Información Personal
      </h2>

      {/* Documento de identidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de documento *
          </label>
          <select
            value={formData.document_type}
            onChange={(e) => handleChange('document_type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="venezolano">V</option>
            <option value="passporte">P</option>
            <option value="extranjero">E</option>
            <option value="rif">J</option>
            <option value="gobierno">G</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de documento *
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={formData.document_number}
              onChange={(e) => handleChange('document_number', e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Nombres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primer nombre *
          </label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segundo nombre
          </label>
          <input
            type="text"
            value={formData.middle_name || ''}
            onChange={(e) => handleChange('middle_name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primer apellido *
          </label>
          <input
            type="text"
            value={formData.first_surname}
            onChange={(e) => handleChange('first_surname', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segundo apellido
          </label>
          <input
            type="text"
            value={formData.second_surname || ''}
            onChange={(e) => handleChange('second_surname', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Ubicación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País *
          </label>
          <select
            value={formData.country_id}
            onChange={(e) => handleChange('country_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona un país</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado/Región
          </label>
          <select
            value={formData.state_id || ''}
            onChange={(e) => handleChange('state_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!formData.country_id}
          >
            <option value="">Selecciona un estado</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código postal
          </label>
          <input
            type="text"
            value={formData.postal_code || ''}
            onChange={(e) => handleChange('postal_code', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Dirección */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dirección completa
        </label>
        <textarea
          value={formData.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Contacto y datos personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de nacimiento
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={formData.date_of_birth || ''}
              onChange={(e) => handleChange('date_of_birth', e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Género *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="not_specified">Prefiero no decirlo</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>

      {/* Botón de guardar */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
