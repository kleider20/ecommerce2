// // components/Registration/forms/ProviderForm.jsx
// import React from 'react';
// import {
//   Building,
//   CreditCard,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Camera
// } from 'lucide-react';

// const ProviderForm = ({ formData, onInputChange }) => {
//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-semibold text-gray-900">Información de Proveedor</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Nombre de la empresa *
//           </label>
//           <div className="relative">
//             <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="company_name"
//               value={formData.company_name}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Empresa S.A.C."
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             RUC / NIT *
//           </label>
//           <div className="relative">
//             <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="company_ruc"
//               value={formData.company_ruc}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="12345678901"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Dirección de la empresa *
//           </label>
//           <div className="relative">
//             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="company_address"
//               value={formData.company_address}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Av. Comercial 456, Ciudad"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Teléfono de la empresa *
//           </label>
//           <div className="relative">
//             <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="tel"
//               name="company_phone"
//               value={formData.company_phone}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="+51 999 999 999"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Correo de la empresa *
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="email"
//               name="company_email"
//               value={formData.company_email}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="contacto@empresa.com"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Sitio web
//           </label>
//           <div className="relative">
//             <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="url"
//               name="company_website"
//               value={formData.company_website}
//               onChange={onInputChange}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="https://empresa.com"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Licencia de negocio
//           </label>
//           <div className="relative">
//             <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="business_license"
//               value={formData.business_license}
//               onChange={onInputChange}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Número de licencia o archivo adjunto"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Descripción de la empresa
//           </label>
//           <textarea
//             name="company_description"
//             value={formData.company_description}
//             onChange={onInputChange}
//             rows="3"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Describe tu empresa, productos y servicios..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProviderForm;


// resources/js/Components/Registration/Forms/ProviderForm.jsx
import React from 'react';
import {
  Building,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera
} from 'lucide-react';

const ProviderForm = ({ data, errors, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Información de Proveedor</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la empresa *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.company_name}
              onChange={e => onInputChange('company_name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.company_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Empresa S.A.C."
            />
          </div>
          {errors.company_name && (
            <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RUC / NIT *
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.company_ruc}
              onChange={e => onInputChange('company_ruc', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.company_ruc ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12345678901"
            />
          </div>
          {errors.company_ruc && (
            <p className="text-red-500 text-sm mt-1">{errors.company_ruc}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección de la empresa *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.company_address}
              onChange={e => onInputChange('company_address', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.company_address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Av. Comercial 456, Ciudad"
            />
          </div>
          {errors.company_address && (
            <p className="text-red-500 text-sm mt-1">{errors.company_address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono de la empresa *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={data.company_phone}
              onChange={e => onInputChange('company_phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.company_phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+51 999 999 999"
            />
          </div>
          {errors.company_phone && (
            <p className="text-red-500 text-sm mt-1">{errors.company_phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo de la empresa *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={data.company_email}
              onChange={e => onInputChange('company_email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.company_email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="contacto@empresa.com"
            />
          </div>
          {errors.company_email && (
            <p className="text-red-500 text-sm mt-1">{errors.company_email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sitio web
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={data.company_website}
              onChange={e => onInputChange('company_website', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.company_website ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://empresa.com"
            />
          </div>
          {errors.company_website && (
            <p className="text-red-500 text-sm mt-1">{errors.company_website}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Licencia de negocio
          </label>
          <div className="relative">
            <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.business_license}
              onChange={e => onInputChange('business_license', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.business_license ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Número de licencia o archivo adjunto"
            />
          </div>
          {errors.business_license && (
            <p className="text-red-500 text-sm mt-1">{errors.business_license}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción de la empresa
          </label>
          <textarea
            value={data.company_description}
            onChange={e => onInputChange('company_description', e.target.value)}
            rows="3"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.company_description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe tu empresa, productos y servicios..."
          />
          {errors.company_description && (
            <p className="text-red-500 text-sm mt-1">{errors.company_description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderForm;
