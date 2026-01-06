<?php
// app/Http/Middleware/Concerns/SharesLayoutConfig.php
namespace App\Http\Middleware\Concerns;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\PageLayout;
use App\Models\Permission;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

trait SharesLayoutConfig
{
    protected function getLayoutConfigData(Request $request)
    {
        // ✅ Obtener configuraciones de layouts en una sola consulta
        $layoutConfigs = PageLayout::active()->get();

        // ✅ Obtener configuraciones por página
        $pageLayouts = $layoutConfigs->pluck('layout_path', 'page_name')->toArray();
        $pagePermissions = $layoutConfigs->pluck('permission', 'page_name')->toArray();
        $pageRoles = $layoutConfigs->pluck('role', 'page_name')->toArray();

        // ✅ Detectar página actual automáticamente (con ruta completa)
        $currentPageName = $this->getCurrentPageName($request);

        // ✅ Escanear todas las páginas disponibles (con estructura de carpetas)
        $availablePages = $this->scanPages();

        return [
            'currentPageName' => $currentPageName,
            'pageLayouts' => $pageLayouts,
            'pagePermissions' => $pagePermissions,
            'pageRoles' => $pageRoles,
            'availablePages' => $availablePages,
            'layoutConfigurations' => $layoutConfigs->pluck('layout_path', 'layout_type')->toArray(),

            // ✅ ROLES CON METADATOS (en lugar de solo nombres)
            'availableRoles' => $this->getAvailableRolesWithMetadata(),
            'availableLayoutTypes' => ['dashboard', 'profile', 'register', 'form', 'settings'],

            // ✅ PERMISOS CON METADATOS
            'availablePermissions' => $this->getAvailablePermissionsWithMetadata(),
        ];
    }

    // ✅ MÉTODO PARA OBTENER ROLES CON METADATOS
    private function getAvailableRolesWithMetadata()
    {
        return Role::with('metadata')
            ->get()
            ->map(function ($role) {
                return [
                    'name' => $role->name,
                    'display_name' => $role->display_name,
                    'description' => $role->description,
                    'color' => $role->color,
                    'icon' => $role->icon,
                    'users_count' => $role->users_count,
                    'permissions_count' => $role->permissions_count
                ];
            })
            ->toArray();
    }

    // ✅ MÉTODO PARA OBTENER PERMISOS CON METADATOS
    private function getAvailablePermissionsWithMetadata()
    {
        return Permission::with('metadata')
            ->get()
            ->map(function ($permission) {
                return [
                    'name' => $permission->name,
                    'display_name' => $permission->display_name,
                    'description' => $permission->description,
                    'is_critical' => $permission->is_critical,
                    'category' => $permission->metadata?->category ?? 'General'
                ];
            })
            ->toArray();
    }

    private function getCurrentPageName(Request $request)
    {
        // ✅ 1. Intentar con X-Inertia-Component (carga inicial)
        $component = $request->header('X-Inertia-Component');

        // ✅ 2. Intentar con X-Inertia-Partial-Component (actualizaciones parciales)
        if (!$component) {
            $component = $request->header('X-Inertia-Partial-Component');
        }

        // ✅ 3. Si no hay headers, usar la ruta como fallback
        if (!$component) {
            $path = ltrim($request->path(), '/');

            // Mapeo específico para rutas conocidas
            $routeMap = [
                'dashboard' => 'Dashboard/Dashboard',
                'admin/page-layouts' => 'Admin/PageLayouts',
                // Agrega otras rutas según necesites
            ];

            if (isset($routeMap[$path])) {
                return $routeMap[$path];
            }

            // Intento genérico
            $segments = array_values(array_filter(explode('/', $path)));
            if (!empty($segments)) {
                $lastSegment = end($segments);
                $componentName = str_replace(['-', '_'], ' ', $lastSegment);
                $componentName = str_replace(' ', '', ucwords($componentName));
                return $componentName;
            }
        }

        // ✅ Devolver el componente tal como lo envía Inertia
        if ($component) {
            return $component;
        }

        return 'DefaultPage';
    }

    private function scanPages()
    {
        $pages = [];
        $pagesDir = resource_path('js/Pages');

        if (!is_dir($pagesDir)) {
            return [];
        }

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($pagesDir, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'jsx') {
                $relativePath = str_replace($pagesDir . DIRECTORY_SEPARATOR, '', $file);
                $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
                $relativePath = preg_replace('/\.jsx$/', '', $relativePath);

                $pages[] = $relativePath;
            }
        }

        return array_values(array_unique($pages));
    }
}
