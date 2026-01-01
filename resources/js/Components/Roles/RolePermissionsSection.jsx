// // resources/js/Components/Roles/RolePermissionsSection.jsx
// import React from 'react';
// import {
//   ArrowLeft, Shield, Users, Key, UserPlus,
//   CheckCircle, XCircle, Lock
// } from 'lucide-react';
// import { router, Link } from '@inertiajs/react'; // ✅ Importa route

// const iconMap = {
//   Shield: Shield,
//   Users: Users,
// };

// const RolePermissionsSection = ({
//   selectedRole,
//   permissions,
//   canModifyPermissions,
//   onBack,
//   authUser
// }) => {
//   const isPermissionAssigned = (permissionId) => {
//     return permissions.some(p => p.id === permissionId && p.users_count > 0);
//   };

//   const getRolePermissions = (roleId) => {
//     return permissions.filter(p => p.roles && p.roles.some(r => r.id === roleId));
//   };

//   const rolePermissions = getRolePermissions(selectedRole.id);
//   const availablePermissions = permissions.filter(p => !rolePermissions.find(rp => rp.id === p.id));

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <button onClick={onBack} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole.color}`}>
//             {iconMap[selectedRole.icon] ?
//               React.createElement(iconMap[selectedRole.icon], { className: "w-5 h-5" }) :
//               <Shield className="w-5 h-5" />
//             }
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">{selectedRole.display_name}</h2>
//             <p className="text-sm text-gray-600">{selectedRole.description}</p>
//           </div>
//         </div>

//         {canModifyPermissions && (
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
//             <UserPlus className="w-4 h-4" /> Asignar Usuarios
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Permisos asignados */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-gray-900">Permisos Asignados ({rolePermissions.length})</h3>
//             {canModifyPermissions && (
//             //   <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">+ Agregar Permiso</button>
//               <Link
//               href={route('roles.permissions.create')}
//               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//             >
//               + Agregar Permiso
//             </Link>
//             )}

//           </div>

//           <div className="space-y-3 max-h-96 overflow-y-auto">
//             {rolePermissions.length > 0 ? rolePermissions.map(permission => {
//               const isAssigned = isPermissionAssigned(permission.id);
//               const isCritical = permission.is_critical;
//               const canDetach = canModifyPermissions && !isAssigned && !isCritical;

//               return (
//                 <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
//                     <p className="text-sm text-gray-600">{permission.description}</p>
//                     {(isAssigned || isCritical) && (
//                       <div className="flex items-center gap-1 mt-1">
//                         {isAssigned && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                             <Users className="w-3 h-3 mr-1" /> Asignado
//                           </span>
//                         )}
//                         {isCritical && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             <Lock className="w-3 h-3 mr-1" /> Crítico
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {canDetach ? (
//                     <button
//                       onClick={() => {
//                         if (confirm('¿Quitar permiso?')) {
//                           // ✅ Usar parámetros de ruta
//                           router.post(route('roles.permissions.detach', {
//                             role: selectedRole.id,
//                             permission: permission.id
//                           }));
//                         }
//                       }}
//                       className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
//                     >
//                       <XCircle className="w-4 h-4" />
//                     </button>
//                   ) : (
//                     <div className="text-gray-400">🔒</div>
//                   )}
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-8 text-gray-500">
//                 <Key className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                 <p>No hay permisos asignados</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Permisos disponibles */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="font-semibold text-gray-900 mb-4">
//             Permisos Disponibles ({availablePermissions.length})
//           </h3>
//           <div className="space-y-3 max-h-96 overflow-y-auto">
//             {availablePermissions.length > 0 ? availablePermissions.map(permission => {
//               const isAssigned = isPermissionAssigned(permission.id);
//               const isCritical = permission.is_critical;
//               const canAttach = canModifyPermissions && !isCritical;

//               return (
//                 <div
//                   key={permission.id}
//                   className={`flex items-center justify-between p-3 border rounded-lg ${
//                     canAttach
//                       ? 'border-gray-200 hover:border-blue-300 transition-colors'
//                       : 'border-gray-200 bg-gray-50 cursor-not-allowed'
//                   }`}
//                 >
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
//                     <p className="text-sm text-gray-600">{permission.description}</p>
//                     {(isAssigned || isCritical) && (
//                       <div className="flex items-center gap-1 mt-1">
//                         {isAssigned && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                             <Users className="w-3 h-3 mr-1" /> Asignado
//                           </span>
//                         )}
//                         {isCritical && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             <Lock className="w-3 h-3 mr-1" /> Crítico
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {canAttach ? (
//                     <button
//                       onClick={() => {
//                         // ✅ Usar parámetros de ruta
//                         router.post(route('roles.permissions.attach', {
//                           role: selectedRole.id,
//                           permission: permission.id
//                         }));
//                       }}
//                       className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 rounded transition-colors"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                     </button>
//                   ) : (
//                     <div className="text-gray-400">
//                       {isCritical ? <Lock className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
//                     </div>
//                   )}
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-8 text-gray-500">
//                 <Shield className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                 <p>Todos los permisos están asignados</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolePermissionsSection;


// // resources/js/Components/Roles/RolePermissionsSection.jsx
// import React from 'react';
// import {
//   ArrowLeft, Shield, Users, Key, UserPlus,
//   CheckCircle, XCircle, Lock
// } from 'lucide-react';
// import { Link, router } from '@inertiajs/react'; // ✅ Importa router y route
// import { toast } from 'react-toastify'; // ✅ Para mensajes toast

// const iconMap = {
//   Shield: Shield,
//   Users: Users,
// };

// const RolePermissionsSection = ({
//   selectedRole,
//   permissions,
//   canModifyPermissions,
//   onBack,
//   authUser
// }) => {
//   const isPermissionAssigned = (permissionId) => {
//     return permissions.some(p => p.id === permissionId && p.users_count > 0);
//   };

//   const getRolePermissions = (roleId) => {
//     return permissions.filter(p => p.roles && p.roles.some(r => r.id === roleId));
//   };

//   const rolePermissions = getRolePermissions(selectedRole.id);
//   const availablePermissions = permissions.filter(p => !rolePermissions.find(rp => rp.id === p.id));

//   return (
//     <div className="space-y-8">
//       {/* Header elegante */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onBack}
//             className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Volver a roles"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>

//           <div className="flex items-center gap-4">
//             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole.color} shadow-sm`}>
//               {iconMap[selectedRole.icon] ?
//                 React.createElement(iconMap[selectedRole.icon], { className: "w-6 h-6" }) :
//                 <Shield className="w-6 h-6" />
//               }
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">{selectedRole.display_name}</h2>
//               <p className="text-sm text-gray-500 mt-1">{selectedRole.description}</p>
//             </div>
//           </div>
//         </div>

//         {canModifyPermissions && (
//           <div className="flex gap-3">
//             <Link
//               href="/permissions/create"
//               className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <UserPlus className="w-4 h-4 mr-2" />
//               Asignar Usuarios
//             </Link>
//             <Link
//               href="/permissions/create"
//               className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
//             >
//               + Agregar Permiso
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Grid de permisos */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Permisos asignados */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
//           <div className="px-6 py-5 border-b border-gray-100">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-gray-900">Permisos Asignados</h3>
//               <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
//                 {rolePermissions.length}
//               </span>
//             </div>
//           </div>

//           <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
//             {rolePermissions.length > 0 ? rolePermissions.map(permission => {
//               const isAssigned = isPermissionAssigned(permission.id);
//               const isCritical = permission.is_critical;
//               const canDetach = canModifyPermissions && !isAssigned && !isCritical;

//               return (
//                 <div key={permission.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{permission.description}</p>

//                     {(isAssigned || isCritical) && (
//                       <div className="flex flex-wrap gap-2 mt-3">
//                         {isAssigned && (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                             <Users className="w-3 h-3 mr-1" /> Asignado
//                           </span>
//                         )}
//                         {isCritical && (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             <Lock className="w-3 h-3 mr-1" /> Crítico
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {canDetach ? (
//                     <button
//                       onClick={() => {
//                         if (confirm('¿Quitar permiso?')) {
//                           router.post(route('roles.permissions.detach', {
//                             role: selectedRole.id,
//                             permission: permission.id
//                           }), {}, {
//                             onSuccess: () => {
//                               toast.success('Permiso removido exitosamente', {
//                                 position: "top-center",
//                                 autoClose: 3000,
//                               });
//                             },
//                             onError: (errors) => {
//                               toast.error(errors?.error || 'Error al quitar el permiso');
//                             }
//                           });
//                         }
//                       }}
//                       className="flex items-center justify-center w-9 h-9 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
//                       aria-label="Quitar permiso"
//                     >
//                       <XCircle className="w-5 h-5" />
//                     </button>
//                   ) : (
//                     <div className="flex items-center justify-center w-9 h-9 text-gray-400">
//                       <Lock className="w-5 h-5" />
//                     </div>
//                   )}
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-12">
//                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Key className="w-6 h-6 text-gray-400" />
//                 </div>
//                 <h4 className="font-medium text-gray-900 mb-1">Sin permisos asignados</h4>
//                 <p className="text-sm text-gray-500">Aún no se han asignado permisos a este rol.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Permisos disponibles */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
//           <div className="px-6 py-5 border-b border-gray-100">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-gray-900">Permisos Disponibles</h3>
//               <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
//                 {availablePermissions.length}
//               </span>
//             </div>
//           </div>

//           <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
//             {availablePermissions.length > 0 ? availablePermissions.map(permission => {
//               const isAssigned = isPermissionAssigned(permission.id);
//               const isCritical = permission.is_critical;
//               const canAttach = canModifyPermissions && !isCritical;

//               return (
//                 <div
//                   key={permission.id}
//                   className={`flex items-start justify-between p-4 rounded-xl border ${
//                     canAttach
//                       ? 'border-gray-200 hover:border-blue-300 bg-white'
//                       : 'border-gray-200 bg-gray-50 cursor-not-allowed'
//                   } transition-colors`}
//                 >
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">{permission.description}</p>

//                     {(isAssigned || isCritical) && (
//                       <div className="flex flex-wrap gap-2 mt-3">
//                         {isAssigned && (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                             <Users className="w-3 h-3 mr-1" /> Asignado
//                           </span>
//                         )}
//                         {isCritical && (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             <Lock className="w-3 h-3 mr-1" /> Crítico
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {canAttach ? (
//                     <button
//                       onClick={() => {
//                         router.post(route('roles.permissions.attach', {
//                           role: selectedRole.id,
//                           permission: permission.id
//                         }), {}, {
//                           onSuccess: () => {
//                             toast.success('Permiso asignado exitosamente', {
//                               position: "top-center",
//                               autoClose: 3000,
//                             });
//                           },
//                           onError: (errors) => {
//                             toast.error(errors?.error || 'Error al asignar el permiso');
//                           }
//                         });
//                       }}
//                       className="flex items-center justify-center w-9 h-9 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
//                       aria-label="Asignar permiso"
//                     >
//                       <CheckCircle className="w-5 h-5" />
//                     </button>
//                   ) : (
//                     <div className="flex items-center justify-center w-9 h-9 text-gray-400">
//                       {isCritical ? <Lock className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
//                     </div>
//                   )}
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-12">
//                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Shield className="w-6 h-6 text-gray-400" />
//                 </div>
//                 <h4 className="font-medium text-gray-900 mb-1">Todos los permisos asignados</h4>
//                 <p className="text-sm text-gray-500">No hay permisos disponibles para asignar.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolePermissionsSection;


// resources/js/Components/Roles/RolePermissionsSection.jsx
import React, { useState } from 'react';
import {
  ArrowLeft, Shield, Users, Key, UserPlus,
  CheckCircle, XCircle, Lock
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/Components/Toast/ConfirmationModal';

const iconMap = {
  Shield: Shield,
  Users: Users,
};

const RolePermissionsSection = ({
  selectedRole,
  permissions,
  canModifyPermissions,
  onBack,
  authUser
}) => {
  const [showDetachModal, setShowDetachModal] = useState(false);
  const [permissionToDetach, setPermissionToDetach] = useState(null);

  const isPermissionAssigned = (permissionId) => {
    return permissions.some(p => p.id === permissionId && p.users_count > 0);
  };

  const getRolePermissions = (roleId) => {
    return permissions.filter(p => p.roles && p.roles.some(r => r.id === roleId));
  };

  const rolePermissions = getRolePermissions(selectedRole.id);
  const availablePermissions = permissions.filter(p => !rolePermissions.find(rp => rp.id === p.id));

  // ✅ Solo para quitar permiso (con confirmación)
  const handleDetachClick = (permission) => {
    setPermissionToDetach(permission);
    setShowDetachModal(true);
  };

  const handleDetachConfirm = () => {
    if (!permissionToDetach) return;

    router.post(route('roles.permissions.detach', {
      role: selectedRole.id,
      permission: permissionToDetach.id
    }), {}, {
      onSuccess: () => {
        setShowDetachModal(false);
        toast.success('Permiso removido exitosamente', {
          position: "top-center",
          autoClose: 3000,
        });
      },
      onError: (errors) => {
        toast.error(errors?.error || 'Error al quitar el permiso');
        setShowDetachModal(false);
      }
    });
  };

  // ✅ Para asignar permiso (sin confirmación)
  const handleAttachClick = (permission) => {
    router.post(route('roles.permissions.attach', {
      role: selectedRole.id,
      permission: permission.id
    }), {}, {
      onSuccess: () => {
        toast.success('Permiso asignado exitosamente', {
          position: "top-center",
          autoClose: 3000,
        });
      },
      onError: (errors) => {
        toast.error(errors?.error || 'Error al asignar el permiso');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header elegante */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Volver a roles"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole.color} shadow-sm`}>
              {iconMap[selectedRole.icon] ?
                React.createElement(iconMap[selectedRole.icon], { className: "w-6 h-6" }) :
                <Shield className="w-6 h-6" />
              }
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedRole.display_name}</h2>
              <p className="text-sm text-gray-500 mt-1">{selectedRole.description}</p>
            </div>
          </div>
        </div>

        {canModifyPermissions && (
          <div className="flex gap-3">
            <Link
              href="/permissions/create"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Asignar Usuarios
            </Link>
            {/* <Link
              href="/permissions/create"
              className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
            >
              + Agregar Permiso
            </Link> */}
            <Link
               href={route('roles.permissions.create')}
               className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
             >
               + Agregar Permiso
             </Link>
          </div>
        )}
      </div>

      {/* Grid de permisos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Permisos asignados */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Permisos Asignados</h3>
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {rolePermissions.length}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {rolePermissions.length > 0 ? rolePermissions.map(permission => {
              const isAssigned = isPermissionAssigned(permission.id);
              const isCritical = permission.is_critical;
              const canDetach = canModifyPermissions && !isAssigned && !isCritical;

              return (
                <div key={permission.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{permission.description}</p>

                    {(isAssigned || isCritical) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {isAssigned && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Users className="w-3 h-3 mr-1" /> Asignado
                          </span>
                        )}
                        {isCritical && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Lock className="w-3 h-3 mr-1" /> Crítico
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {canDetach ? (
                    <button
                      onClick={() => handleDetachClick(permission)}
                      className="flex items-center justify-center w-9 h-9 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Quitar permiso"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-center w-9 h-9 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Sin permisos asignados</h4>
                <p className="text-sm text-gray-500">Aún no se han asignado permisos a este rol.</p>
              </div>
            )}
          </div>
        </div>

        {/* Permisos disponibles */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Permisos Disponibles</h3>
              <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
                {availablePermissions.length}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {availablePermissions.length > 0 ? availablePermissions.map(permission => {
              const isAssigned = isPermissionAssigned(permission.id);
              const isCritical = permission.is_critical;
              const canAttach = canModifyPermissions && !isCritical;

              return (
                <div
                  key={permission.id}
                  className={`flex items-start justify-between p-4 rounded-xl border ${
                    canAttach
                      ? 'border-gray-200 hover:border-blue-300 bg-white'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  } transition-colors`}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{permission.description}</p>

                    {(isAssigned || isCritical) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {isAssigned && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Users className="w-3 h-3 mr-1" /> Asignado
                          </span>
                        )}
                        {isCritical && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Lock className="w-3 h-3 mr-1" /> Crítico
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {canAttach ? (
                    <button
                      onClick={() => handleAttachClick(permission)}
                      className="flex items-center justify-center w-9 h-9 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                      aria-label="Asignar permiso"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-center w-9 h-9 text-gray-400">
                      {isCritical ? <Lock className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Todos los permisos asignados</h4>
                <p className="text-sm text-gray-500">No hay permisos disponibles para asignar.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Modal SOLO para quitar permiso */}
      <ConfirmationModal
        isOpen={showDetachModal}
        onClose={() => setShowDetachModal(false)}
        onConfirm={handleDetachConfirm}
        title="Quitar permiso"
        message={`¿Está seguro de quitar el permiso "${permissionToDetach?.display_name}" de este rol?`}
        confirmText="Sí, quitar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default RolePermissionsSection;
