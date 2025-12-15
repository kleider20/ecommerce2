<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\PermissionMetadata;

class Permission extends SpatiePermission
{
    // ✅ Cargar relaciones automáticamente
    protected $with = ['metadata', 'roles'];

    // ✅ Asegurar que los accesores aparezcan en toArray()
    protected $appends = [
        'display_name',
        'description',
        'is_critical',
        'roles' // Incluir roles en la respuesta
    ];

    // ✅ Relación con PermissionMetadata
    public function metadata(): HasOne
    {
        return $this->hasOne(PermissionMetadata::class, 'permission_id');
    }

    // ✅ Relación con usuarios (requerida por Spatie)
    public function users(): BelongsToMany
    {
        return parent::users();
    }

    // ✅ Accesor para incluir roles en la API
    public function getRolesAttribute()
    {
        return $this->roles()->select('id', 'name')->get();
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

    public function getIsCriticalAttribute()
    {
        return $this->metadata?->is_critical ?? false;
    }

    // ✅ Lógica de seguridad
    public function canBeDeleted(): bool
    {
        if ($this->metadata?->is_critical) {
            return false;
        }
        return $this->users()->count() === 0;
    }
}
