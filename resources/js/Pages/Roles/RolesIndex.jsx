// // resources/js/Pages/Roles/RolesIndex.jsx
// import React, { useState, useMemo } from 'react';
// import { Head, router } from '@inertiajs/react'; // ✅ Importa route
// import RoleHeader from '@/Components/Roles/RoleHeader';
// import RoleSearchFilters from '@/Components/Roles/RoleSearchFilters';
// import RoleCard from '@/Components/Roles/RoleCard';
// import RolePermissionsSection from '@/Components/Roles/RolePermissionsSection';
// import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
// import ConfirmationModal from '@/Components/Toast/ConfirmationModal';
// import { toast } from 'react-toastify';

// const RolesIndex = ({ roles: initialRoles, permissions, authUser }) => {
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [roles, setRoles] = useState(initialRoles); // ✅ Estado controlado

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roleToDelete, setRoleToDelete] = useState(null);

//   const handleDeleteClick = (roleId) => {
//     setRoleToDelete(roleId);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = () => {
//     router.delete(route('roles.destroy', roleToDelete), {
//       onSuccess: () => {
//         const updatedRoles = roles.filter(r => r.id !== roleToDelete);
//         setRoles(updatedRoles);
//         setShowDeleteModal(false);

//         // ✅ Toast de éxito profesional
//         toast.success('¡Rol eliminado exitosamente!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       },
//       onError: (errors) => {
//         // ✅ Toast de error profesional
//         toast.error(errors?.error || 'Error al eliminar el rol', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     });
//   };

//   const isSuperAdmin = authUser.roles.some(role => role.name === 'super_admin');
//   const isAdmin = authUser.roles.some(role => role.name === 'admin');
//   const isOwnRole = selectedRole && authUser.roles.some(role => role.id === selectedRole.id);
//   const isSelectedSuperAdmin = selectedRole && selectedRole.name === 'super_admin';

//   const canCreateRoles = isSuperAdmin;
//   const canModifyRole = (role) => {
//     if (role.name === 'super_admin' && isSuperAdmin) return false;
//     if (authUser.roles.some(r => r.id === role.id)) return false;
//     if (role.name === 'super_admin' && isAdmin) return false;
//     return true;
//   };

//   const canModifyPermissions = !isSelectedSuperAdmin && !isOwnRole;

//   const visibleRoles = useMemo(() => {
//     return roles.filter(role => {
//       if (isAdmin && role.name === 'super_admin') return false;
//       return true;
//     });
//   }, [roles, isAdmin]);

//   const filteredRoles = useMemo(() => {
//     return visibleRoles.filter(role => {
//       const matchesSearch = role.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()));
//       const matchesFilter = filterRole === 'all' || role.name === filterRole;
//       return matchesSearch && matchesFilter;
//     });
//   }, [visibleRoles, searchTerm, filterRole]);

//   // ✅ Corrección: Actualiza el estado local y evita recarga
//   const handleToggleRegister = (roleId) => {
//     router.patch(route('roles.toggle-register', roleId), {}, {
//       preserveScroll: true,
//       onSuccess: (page) => {
//         // Actualiza el estado local con la respuesta
//         const updatedRoles = roles.map(role =>
//           role.id === roleId
//             ? { ...role, show_in_register: !role.show_in_register }
//             : role
//         );
//         setRoles(updatedRoles);
//       },
//       onError: (errors) => {
//         console.error('Error al actualizar:', errors);
//       }
//     });
//   };

// const handleDeleteRole = (roleId) => {
//     const role = roles.find(r => r.id === roleId);

//     if (!confirm(`¿Eliminar rol "${role?.display_name}"?`)) return;

//     router.delete(route('roles.destroy', roleId), {
//         onSuccess: () => {
//         const updatedRoles = roles.filter(r => r.id !== roleId);
//         setRoles(updatedRoles);
//         toast.success(`El rol "${role?.display_name}" ha sido eliminado.`);
//         },
//         onError: (errors) => {
//         toast.error(errors?.error || 'Error al eliminar el rol.');
//         }
//     });
// };

//   return (
//     <>
//     <SuperAdminLayout>
//       <Head title="Gestión de Roles y Permisos" />

//       <RoleHeader canCreateRoles={canCreateRoles} />

//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {selectedRole ? (
//           <RolePermissionsSection
//             selectedRole={selectedRole}
//             permissions={permissions}
//             canModifyPermissions={canModifyPermissions}
//             onBack={() => setSelectedRole(null)}
//             authUser={authUser}
//           />
//         ) : (
//           <div className="space-y-8">
//             <RoleSearchFilters
//               searchTerm={searchTerm}
//               onSearchChange={setSearchTerm}
//               filterRole={filterRole}
//               onFilterChange={setFilterRole}
//               roles={filteredRoles}
//             />
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredRoles.map(role => (
//                 <RoleCard
//                   key={role.id}
//                   role={role}
//                   isSelected={selectedRole?.id === role.id}
//                   onClick={() => setSelectedRole(role)}
//                   canModifyRole={canModifyRole}
//                   isSuperAdmin={isSuperAdmin}
//                   onToggleRegister={handleToggleRegister}
//                   onDeleteRole={handleDeleteRole}
//                 />
//               ))}
//             </div>

//             <ConfirmationModal
//                 isOpen={showDeleteModal}
//                 onClose={() => setShowDeleteModal(false)}
//                 onConfirm={handleDeleteConfirm}
//                 title="Eliminar rol"
//                 message={`¿Está seguro de eliminar el rol "${roles.find(r => r.id === roleToDelete)?.display_name}"? Esta acción no se puede deshacer y los usuarios asignados quedarán sin rol.`}
//                 confirmText="Sí, eliminar"
//                 cancelText="Cancelar"
//             />
//           </div>
//         )}
//       </div>
//       </SuperAdminLayout>
//     </>
//   );
// };

// export default RolesIndex;


// resources/js/Pages/Roles/RolesIndex.jsx
import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import RoleHeader from '@/Components/Roles/RoleHeader';
import RoleSearchFilters from '@/Components/Roles/RoleSearchFilters';
import RoleCard from '@/Components/Roles/RoleCard';
import RolePermissionsSection from '@/Components/Roles/RolePermissionsSection';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import ConfirmationModal from '@/Components/Toast/ConfirmationModal';
import { toast } from 'react-toastify';

const RolesIndex = ({ roles: initialRoles, permissions, authUser }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [roles, setRoles] = useState(initialRoles);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const isSuperAdmin = authUser.roles.some(role => role.name === 'super_admin');
  const isAdmin = authUser.roles.some(role => role.name === 'admin');
  const isOwnRole = selectedRole && authUser.roles.some(role => role.id === selectedRole.id);
  const isSelectedSuperAdmin = selectedRole && selectedRole.name === 'super_admin';

  const canCreateRoles = isSuperAdmin;
  const canModifyRole = (role) => {
    if (role.name === 'super_admin' && isSuperAdmin) return false;
    if (authUser.roles.some(r => r.id === role.id)) return false;
    if (role.name === 'super_admin' && isAdmin) return false;
    return true;
  };

  const canModifyPermissions = !isSelectedSuperAdmin && !isOwnRole;

  const visibleRoles = useMemo(() => {
    return roles.filter(role => {
      if (isAdmin && role.name === 'super_admin') return false;
      return true;
    });
  }, [roles, isAdmin]);

  const filteredRoles = useMemo(() => {
    return visibleRoles.filter(role => {
      const matchesSearch = role.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterRole === 'all' || role.name === filterRole;
      return matchesSearch && matchesFilter;
    });
  }, [visibleRoles, searchTerm, filterRole]);

  const handleToggleRegister = (roleId) => {
    router.patch(route('roles.toggle-register', roleId), {}, {
      preserveScroll: true,
      onSuccess: () => {
        const updatedRoles = roles.map(role =>
          role.id === roleId
            ? { ...role, show_in_register: !role.show_in_register }
            : role
        );
        setRoles(updatedRoles);
      },
      onError: (errors) => {
        console.error('Error al actualizar:', errors);
      }
    });
  };

  const handleDeleteClick = (roleId) => {
    setRoleToDelete(roleId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    router.delete(route('roles.destroy', roleToDelete), {
      onSuccess: () => {
        const updatedRoles = roles.filter(r => r.id !== roleToDelete);
        setRoles(updatedRoles);
        setShowDeleteModal(false);
        toast.success('¡Rol eliminado exitosamente!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      onError: (errors) => {
        toast.error(errors?.error || 'Error al eliminar el rol', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };

  return (
    <SuperAdminLayout>
      <Head title="Gestión de Roles y Permisos" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ TARJETA PRINCIPAL - TODO DENTRO */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header elegante */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
            <RoleHeader canCreateRoles={canCreateRoles} />
          </div>

          {/* Contenido principal con padding consistente */}
          <div className="p-6 md:p-8">
            {selectedRole ? (
              <RolePermissionsSection
                selectedRole={selectedRole}
                permissions={permissions}
                canModifyPermissions={canModifyPermissions}
                onBack={() => setSelectedRole(null)}
                authUser={authUser}
              />
            ) : (
              <div className="space-y-8">
                {/* Barra de búsqueda refinada */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <RoleSearchFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filterRole={filterRole}
                    onFilterChange={setFilterRole}
                    roles={filteredRoles}
                  />
                </div>

                {/* Grid de roles */}
                {filteredRoles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoles.map(role => (
                      <RoleCard
                        key={role.id}
                        role={role}
                        isSelected={selectedRole?.id === role.id}
                        onClick={() => setSelectedRole(role)}
                        canModifyRole={canModifyRole}
                        isSuperAdmin={isSuperAdmin}
                        onToggleRegister={handleToggleRegister}
                        onDeleteRole={handleDeleteClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron roles</h3>
                    <p className="text-gray-500">Ajusta los filtros o crea un nuevo rol.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal (fuera de la tarjeta, como debe ser) */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          title="Eliminar rol"
          message={`¿Está seguro de eliminar el rol "${roles.find(r => r.id === roleToDelete)?.display_name}"? Esta acción no se puede deshacer y los usuarios asignados quedarán sin rol.`}
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
        />
      </div>
    </SuperAdminLayout>
  );
};

export default RolesIndex;
