// resources/js/Components/Roles/RoleSearchFilters.jsx
import React from 'react';
import { Search } from 'lucide-react';

const RoleSearchFilters = ({ searchTerm, onSearchChange, filterRole, onFilterChange, roles }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar roles por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.display_name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RoleSearchFilters;
