// resources/js/Components/Roles/RolePermissionsSection.jsx
import React from 'react';
import {
  ArrowLeft, Shield, Users, Key, UserPlus,
  CheckCircle, XCircle, Lock
} from 'lucide-react';
import { router } from '@inertiajs/react'; // ✅ Importa route

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
  const isPermissionAssigned = (permissionId) => {
    return permissions.some(p => p.id === permissionId && p.users_count > 0);
  };

  const getRolePermissions = (roleId) => {
    return permissions.filter(p => p.roles && p.roles.some(r => r.id === roleId));
  };

  const rolePermissions = getRolePermissions(selectedRole.id);
  const availablePermissions = permissions.filter(p => !rolePermissions.find(rp => rp.id === p.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole.color}`}>
            {iconMap[selectedRole.icon] ?
              React.createElement(iconMap[selectedRole.icon], { className: "w-5 h-5" }) :
              <Shield className="w-5 h-5" />
            }
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedRole.display_name}</h2>
            <p className="text-sm text-gray-600">{selectedRole.description}</p>
          </div>
        </div>

        {canModifyPermissions && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <UserPlus className="w-4 h-4" /> Asignar Usuarios
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Permisos asignados */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Permisos Asignados ({rolePermissions.length})</h3>
            {canModifyPermissions && (
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">+ Agregar Permiso</button>
            )}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {rolePermissions.length > 0 ? rolePermissions.map(permission => {
              const isAssigned = isPermissionAssigned(permission.id);
              const isCritical = permission.is_critical;
              const canDetach = canModifyPermissions && !isAssigned && !isCritical;

              return (
                <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
                    <p className="text-sm text-gray-600">{permission.description}</p>
                    {(isAssigned || isCritical) && (
                      <div className="flex items-center gap-1 mt-1">
                        {isAssigned && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Users className="w-3 h-3 mr-1" /> Asignado
                          </span>
                        )}
                        {isCritical && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Lock className="w-3 h-3 mr-1" /> Crítico
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {canDetach ? (
                    <button
                      onClick={() => {
                        if (confirm('¿Quitar permiso?')) {
                          // ✅ Usar parámetros de ruta
                          router.post(route('roles.permissions.detach', {
                            role: selectedRole.id,
                            permission: permission.id
                          }));
                        }
                      }}
                      className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="text-gray-400">🔒</div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center py-8 text-gray-500">
                <Key className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No hay permisos asignados</p>
              </div>
            )}
          </div>
        </div>

        {/* Permisos disponibles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Permisos Disponibles ({availablePermissions.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availablePermissions.length > 0 ? availablePermissions.map(permission => {
              const isAssigned = isPermissionAssigned(permission.id);
              const isCritical = permission.is_critical;
              const canAttach = canModifyPermissions && !isCritical;

              return (
                <div
                  key={permission.id}
                  className={`flex items-center justify-between p-3 border rounded-lg ${
                    canAttach
                      ? 'border-gray-200 hover:border-blue-300 transition-colors'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{permission.display_name}</h4>
                    <p className="text-sm text-gray-600">{permission.description}</p>
                    {(isAssigned || isCritical) && (
                      <div className="flex items-center gap-1 mt-1">
                        {isAssigned && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Users className="w-3 h-3 mr-1" /> Asignado
                          </span>
                        )}
                        {isCritical && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Lock className="w-3 h-3 mr-1" /> Crítico
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {canAttach ? (
                    <button
                      onClick={() => {
                        // ✅ Usar parámetros de ruta
                        router.post(route('roles.permissions.attach', {
                          role: selectedRole.id,
                          permission: permission.id
                        }));
                      }}
                      className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 rounded transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="text-gray-400">
                      {isCritical ? <Lock className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Todos los permisos están asignados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionsSection;
