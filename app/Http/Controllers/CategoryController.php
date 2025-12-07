<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
   public function create()
    {
        // Primero: categorías raíz (sin padre)
        $rootCategories = Category::whereNull('parent_id')
            ->active()
            ->orderBy('name')
            ->get();

        // Luego: categorías con padre (subcategorías)
        $subCategories = Category::whereNotNull('parent_id')
            ->active()
            ->orderBy('name')
            ->get();

        // Combinar: primero raíz, luego subcategorías
        $allCategories = $rootCategories->concat($subCategories);

        $parentOptions = [['id' => '', 'name' => 'Crear como categoría principal']];

        foreach ($allCategories as $category) {
            if ($category->parent_id) {
                // Es subcategoría: indentar visualmente
                $parentOptions[] = [
                    'id' => $category->id,
                    'name' => '  ↳ ' . $category->name,
                ];
            } else {
                // Es raíz
                $parentOptions[] = [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            }
        }

        return Inertia::render('Categories/CategoryCreate', [
            'parentCategories' => $parentOptions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'status' => 'required|in:active,inactive,draft',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->except('images');
        $data['parent_id'] = $request->parent_id ?: null;

        // Guardar imagen principal si existe
        if ($request->hasFile('images') && count($request->file('images')) > 0) {
            $image = $request->file('images')[0];
            $path = $image->store('categories', 'public');
            $data['image_path'] = $path;
        }

        Category::create($data);

        return to_route('categories.create')->with('success', '✅ Categoría creada exitosamente.');
    }
}
