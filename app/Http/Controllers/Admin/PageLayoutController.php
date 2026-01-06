<?php
// app/Http/Controllers/Admin/PageLayoutController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageLayout;
use Spatie\Permission\Models\Role;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageLayoutController extends Controller
{
    public function index()
    {
        $configurations = PageLayout::all();
        $availablePages = $this->scanPages();
        $availableLayouts = $this->scanLayouts();

        // ✅ Obtener roles y permisos con metadatos
        $availableRoles = \App\Models\Role::with('metadata')
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

        $availablePermissions = \App\Models\Permission::with('metadata')
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

        return Inertia::render('Admin/PageLayouts', [
            'configurations' => $configurations,
            'availablePages' => $availablePages,
            'availableRoles' => $availableRoles,
            'availablePermissions' => $availablePermissions,
            'availableLayouts' => $availableLayouts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'page_name' => 'required|string|unique:page_layouts',
            'layout_path' => 'required|string',
            'role' => 'nullable|string',
            'permission' => 'nullable|string',
        ]);

        PageLayout::create([
            'page_name' => $request->page_name,
            'layout_path' => $request->layout_path,
            'role' => $request->role,
            'permission' => $request->permission,
            'is_active' => true
        ]);

        return back()->with('success', 'Configuración guardada exitosamente');
    }

    public function update(Request $request, PageLayout $pageLayout)
    {
        $request->validate([
            'layout_path' => 'required|string',
            'role' => 'nullable|string',
            'permission' => 'nullable|string',
        ]);

        $pageLayout->update([
            'layout_path' => $request->layout_path,
            'role' => $request->role,
            'permission' => $request->permission,
        ]);

        return back()->with('success', 'Configuración actualizada');
    }

    public function destroy(PageLayout $pageLayout)
    {
        $pageLayout->delete();
        return back()->with('success', 'Configuración eliminada');
    }

    private function scanPages()
    {
        $pages = [];
        $pagesDir = resource_path('js/Pages');

        if (!is_dir($pagesDir)) return $pages;

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

        return array_unique($pages);
    }

    private function scanLayouts()
    {
        $layouts = [];
        $layoutDir = resource_path('js/Layouts');

        if (!is_dir($layoutDir)) return $layouts;

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($layoutDir, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'jsx') {
                $relativePath = str_replace($layoutDir . DIRECTORY_SEPARATOR, '', $file);
                $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
                $relativePath = preg_replace('/\.jsx$/', '', $relativePath);
                $layouts[] = $relativePath;
            }
        }

        return array_unique($layouts);
    }
}
