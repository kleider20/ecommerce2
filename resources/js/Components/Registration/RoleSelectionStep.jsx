// // components/Registration/RoleSelectionStep.jsx
// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// const RoleSelectionStep = ({
//   roles,
//   selectedRole,
//   onRoleSelect,
//   onNext
// }) => {
//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué tipo de cuenta necesitas?</h2>
//         <p className="text-gray-600">Selecciona el rol que mejor se adapte a tus necesidades</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {roles.map((role) => {
//           const IconComponent = role.icon;
//           return (
//             <button
//               key={role.id}
//               onClick={() => onRoleSelect(role.id)}
//               className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
//                 selectedRole === role.id
//                   ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
//                   : 'border-gray-200 hover:border-gray-300'
//               }`}
//             >
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${role.color}`}>
//                 <IconComponent className="w-6 h-6" />
//               </div>
//               <h3 className="font-semibold text-gray-900 mb-2">{role.name}</h3>
//               <p className="text-sm text-gray-600">{role.description}</p>
//             </button>
//           );
//         })}
//       </div>

//       {selectedRole && (
//         <div className="flex justify-center">
//           <button
//             onClick={onNext}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 flex items-center gap-2"
//           >
//             Continuar
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoleSelectionStep;


// // resources/js/Components/Registration/RoleSelectionStep.jsx
// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// const RoleSelectionStep = ({
//   roles,
//   selectedRole,
//   onRoleSelect,
//   onNext,
//   processing
// }) => {
//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué tipo de cuenta necesitas?</h2>
//         <p className="text-gray-600">Selecciona el rol que mejor se adapte a tus necesidades</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {roles.map((role) => {
//           const IconComponent = role.iconComponent; // ✅ Ya es un componente válido
//           return (
//             <button
//               key={role.name}
//               onClick={() => onRoleSelect(role.name)}
//               className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
//                 selectedRole === role.name
//                   ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
//                   : 'border-gray-200 hover:border-gray-300'
//               }`}
//               style={{ backgroundColor: role.background_color || 'transparent' }}
//             >
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${role.color}`}>
//                 <IconComponent className="w-6 h-6" /> {/* ✅ Correcto */}
//               </div>
//               <h3 className="font-semibold text-gray-900 mb-2">{role.display_name}</h3>
//               <p className="text-sm text-gray-600">{role.description}</p>
//             </button>
//           );
//         })}
//       </div>

//       {selectedRole && (
//         <div className="flex justify-center">
//           <button
//             onClick={onNext}
//             disabled={processing}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 flex items-center gap-2"
//           >
//             Continuar
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoleSelectionStep;


// resources/js/Components/Registration/RoleSelectionStep.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

const RoleSelectionStep = ({
  roles,
  selectedRole,
  onRoleSelect,
  onNext
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué tipo de cuenta necesitas?</h2>
        <p className="text-gray-600">Selecciona el rol que mejor se adapte a tus necesidades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const IconComponent = role.iconComponent;
          return (
            <button
              key={role.name}
              onClick={() => onRoleSelect(role.name)}
              className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                selectedRole === role.name
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${role.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{role.display_name}</h3>
              <p className="text-sm text-gray-600">{role.description}</p>
            </button>
          );
        })}
      </div>

      {selectedRole && (
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 flex items-center gap-2"
          >
            Continuar
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleSelectionStep;
