// resources/js/Components/Roles/RoleHeader.jsx
import React from 'react';
import { Shield, Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';

const RoleHeader = ({ canCreateRoles }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Gestión de Roles y Permisos</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Administra roles, permisos y configuraciones de acceso del sistema
              </p>
            </div>
          </div>

          {canCreateRoles && (
            <Link
              href={route('roles.create')}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Rol
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleHeader;
