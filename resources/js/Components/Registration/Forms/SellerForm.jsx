// // components/Registration/forms/SellerForm.jsx
// import React from 'react';
// import {
//   Store,
//   MapPin,
//   Phone,
//   Mail,
//   Globe
// } from 'lucide-react';

// const SellerForm = ({ formData, onInputChange }) => {
//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-semibold text-gray-900">Información de Vendedor</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Nombre de la tienda *
//           </label>
//           <div className="relative">
//             <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="store_name"
//               value={formData.store_name}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Tienda Electrónica"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Categoría de la tienda *
//           </label>
//           <select
//             name="store_category"
//             value={formData.store_category}
//             onChange={onInputChange}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Selecciona una categoría</option>
//             <option value="electronics">Electrónica</option>
//             <option value="fashion">Moda</option>
//             <option value="home">Hogar</option>
//             <option value="sports">Deportes</option>
//             <option value="beauty">Belleza</option>
//             <option value="other">Otro</option>
//           </select>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Dirección de la tienda *
//           </label>
//           <div className="relative">
//             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="store_address"
//               value={formData.store_address}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Calle Comercial 789, Ciudad"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Teléfono de la tienda *
//           </label>
//           <div className="relative">
//             <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="tel"
//               name="store_phone"
//               value={formData.store_phone}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="+51 999 999 999"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Correo de la tienda *
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="email"
//               name="store_email"
//               value={formData.store_email}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="tienda@ejemplo.com"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Horario de atención
//           </label>
//           <div className="relative">
//             <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="store_hours"
//               value={formData.store_hours}
//               onChange={onInputChange}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Lun-Vie: 9am-6pm"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Descripción de la tienda
//           </label>
//           <textarea
//             name="store_description"
//             value={formData.store_description}
//             onChange={onInputChange}
//             rows="3"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Describe tu tienda, productos destacados y servicios..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerForm;


// resources/js/Components/Registration/Forms/SellerForm.jsx
import React from 'react';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

const SellerForm = ({ data, errors, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Información de Vendedor</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la tienda *
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.store_name}
              onChange={e => onInputChange('store_name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.store_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tienda Electrónica"
            />
          </div>
          {errors.store_name && (
            <p className="text-red-500 text-sm mt-1">{errors.store_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría de la tienda *
          </label>
          <select
            value={data.store_category}
            onChange={e => onInputChange('store_category', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.store_category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona una categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="fashion">Moda</option>
            <option value="home">Hogar</option>
            <option value="sports">Deportes</option>
            <option value="beauty">Belleza</option>
            <option value="other">Otro</option>
          </select>
          {errors.store_category && (
            <p className="text-red-500 text-sm mt-1">{errors.store_category}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección de la tienda *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.store_address}
              onChange={e => onInputChange('store_address', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.store_address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Calle Comercial 789, Ciudad"
            />
          </div>
          {errors.store_address && (
            <p className="text-red-500 text-sm mt-1">{errors.store_address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono de la tienda *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={data.store_phone}
              onChange={e => onInputChange('store_phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.store_phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+51 999 999 999"
            />
          </div>
          {errors.store_phone && (
            <p className="text-red-500 text-sm mt-1">{errors.store_phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo de la tienda *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={data.store_email}
              onChange={e => onInputChange('store_email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.store_email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="tienda@ejemplo.com"
            />
          </div>
          {errors.store_email && (
            <p className="text-red-500 text-sm mt-1">{errors.store_email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horario de atención
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.store_hours}
              onChange={e => onInputChange('store_hours', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.store_hours ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Lun-Vie: 9am-6pm"
            />
          </div>
          {errors.store_hours && (
            <p className="text-red-500 text-sm mt-1">{errors.store_hours}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción de la tienda
          </label>
          <textarea
            value={data.store_description}
            onChange={e => onInputChange('store_description', e.target.value)}
            rows="3"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.store_description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe tu tienda, productos destacados y servicios..."
          />
          {errors.store_description && (
            <p className="text-red-500 text-sm mt-1">{errors.store_description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
