// resources/js/Components/Roles/RoleCard.jsx
import React from 'react';
import { Shield, Users, Key, Edit3, Trash2, Bike, Crown, Package, Building2, User, Globe } from 'lucide-react';
import { router } from '@inertiajs/react';

const iconMap = {

    Shield: Shield,
    Users: Users,
    Key: Key,
    Globe: Globe,
    Package: Package,
    Building2: Building2,
    User: User,
    Crown: Crown,
    Bike: Bike,
};

const RoleCard = ({
  role,
  isSelected,
  onClick,
  canModifyRole,
  isSuperAdmin,
  onToggleRegister,
  onDeleteRole
}) => {
  const IconComponent = iconMap[role.icon] || Shield;
  const canEdit = canModifyRole(role);

  return (
    <div
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      {/* ✅ Encabezado: icono + título PRINCIPAL (solo una vez) */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role.color}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{role.display_name}</h3>
        </div>

        {/* ✅ Botón toggle arriba y a la derecha */}
        {isSuperAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleRegister(role.id);
            }}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
              role.show_in_register ? 'bg-green-500' : 'bg-gray-300'
            }`}
            aria-pressed={role.show_in_register}
            title={role.show_in_register ? 'Desactivar en registro' : 'Activar en registro'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                role.show_in_register ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        )}
      </div>

      {/* ✅ Descripción y badge de estado */}
      <p className="text-sm text-gray-600 mb-3">{role.description}</p>

      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
        role.show_in_register
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {role.show_in_register ? 'Activo en registro' : 'Inactivo en registro'}
      </span>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {role.users_count || 0}
          </span>
          <span className="flex items.center gap-1">
            <Key className="w-4 h-4" />
            {role.permissions_count || 0}
          </span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
          {role.name}
        </div>
      </div>

      {/* ✅ Acciones (solo si se pueden modificar) */}
      {canEdit && (
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
          <button
            className="flex items-center justify-center w-9 h-9 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              router.visit(route('roles.edit', role.id));
            }}
            aria-label={`Editar ${role.display_name}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all shadow-sm hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteRole(role.id);
            }}
            aria-label={`Eliminar ${role.display_name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}



      {/* {canEdit && (
        <div className="mt-4 flex gap-2">
            <button
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    router.visit(route('roles.edit', role.id)); // ✅ Usa route()
                }}
                >
                <Edit3 className="w-4 h-4" />
            </button>
          <button
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteRole(role.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default RoleCard;
