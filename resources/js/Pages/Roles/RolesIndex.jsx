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
      onSuccess: (page) => {
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

  // ✅ Solo usa esta función (elimina la duplicada handleDeleteRole)
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
    <>
    <SuperAdminLayout>
      <Head title="Gestión de Roles y Permisos" />

      <RoleHeader canCreateRoles={canCreateRoles} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <RoleSearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterRole={filterRole}
              onFilterChange={setFilterRole}
              roles={filteredRoles}
            />
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
                  onDeleteRole={handleDeleteClick} // ✅ Usa handleDeleteClick
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar rol"
        message={`¿Está seguro de eliminar el rol "${roles.find(r => r.id === roleToDelete)?.display_name}"? Esta acción no se puede deshacer y los usuarios asignados quedarán sin rol.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </SuperAdminLayout>
    </>
  );
};

export default RolesIndex;
