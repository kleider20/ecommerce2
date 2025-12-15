<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    // ✅ Carga automática de la relación metadata para evitar N+1
    protected $with = ['metadata'];

    // ✅ Atributos que se incluyen automáticamente en toArray()/toJson()
    protected $appends = [
        'display_name',
        'description',
        'color',
        'icon',
        'users_count',
        'permissions_count',
        'show_in_register'
    ];

    // ✅ Relación con RoleMetadata
    public function metadata()
    {
        return $this->hasOne(RoleMetadata::class, 'role_id');
    }

    // ✅ Accesores dinámicos
    public function getDisplayNameAttribute()
    {
        return $this->metadata?->display_name ?? ucfirst(str_replace('_', ' ', $this->name));
    }

    public function getDescriptionAttribute()
    {
        return $this->metadata?->description ?? '';
    }

    public function getColorAttribute()
    {
        return $this->metadata?->color ?? 'bg-gray-100 text-gray-800';
    }

    public function getIconAttribute()
    {
        return $this->metadata?->icon ?? 'Shield';
    }

    public function getUsersCountAttribute()
    {
        return $this->users()->count();
    }

    public function getPermissionsCountAttribute()
    {
        return $this->permissions()->count();
    }

    public function getShowInRegisterAttribute()
    {
        return $this->metadata?->show_in_register ?? false;
    }
}
