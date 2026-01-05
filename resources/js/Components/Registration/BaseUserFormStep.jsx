// // components/Registration/BaseUserFormStep.jsx
// import React from 'react';
// import {
//   User,
//   Mail,
//   Lock,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const BaseUserFormStep = ({
//   formData,
//   onInputChange,
//   onBack,
//   onNext
// }) => {
//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Información Básica</h2>
//         <p className="text-gray-600">Estos datos se guardarán en la tabla de usuarios base</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Nombre completo *
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Juan Pérez"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Correo electrónico *
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="juan@ejemplo.com"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Contraseña *
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="••••••••"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Confirmar contraseña *
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="password"
//               name="password_confirmation"
//               value={formData.password_confirmation}
//               onChange={onInputChange}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="••••••••"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Atrás
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2"
//         >
//           Continuar
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BaseUserFormStep;


// resources/js/Components/Registration/BaseUserFormStep.jsx
import React from 'react';
import {
  User, Mail, Lock, ChevronLeft, ChevronRight
} from 'lucide-react';

const BaseUserFormStep = ({
  data,
  errors,
  onInputChange,
  onBack,
  onNext,
  isStepValid,
  processing
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Información Básica</h2>
        <p className="text-gray-600">Estos datos se guardarán en la tabla de usuarios base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de usuario *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={data.name}
              onChange={e => onInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tu nombre público"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo electrónico *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={data.email}
              onChange={e => onInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="tu@ejemplo.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={data.password}
              onChange={e => onInputChange('password', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar contraseña *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={data.password_confirmation}
              onChange={e => onInputChange('password_confirmation', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!isStepValid || processing}
          className={`font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2 ${
            isStepValid && !processing
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BaseUserFormStep;
