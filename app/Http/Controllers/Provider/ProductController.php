<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Category;

class ProductController extends Controller
{
    // public function __construct()
    // {
    //     // Proteger todas las acciones con el permiso 'view own products' y 'create products'
    //     $this->middleware('permission:view own products')->only(['index', 'show']);
    //     $this->middleware('permission:create products')->only(['create', 'store']);
    //     $this->middleware('permission:edit own products')->only(['edit', 'update']);
    //     $this->middleware('permission:delete own products')->only('destroy');
    // }

    /**
     * Muestra la lista de productos del proveedor autenticado.
     */
    public function index()
    {
            /// Solo productos del proveedor autenticado
        $products = Auth::user()->products()
        ->select([
            'id', 'name', 'description', 'category',
            'price_usd', 'stock', 'in_stock', 'image_url', 'created_at'
        ])
        ->get();

        return Inertia::render('Products/ProductIndex', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = Category::where('status', 'active')->get(['id', 'name']);

        return Inertia::render('Products/ProductCreate',[

            'categories' => $categories

        ]);
    }


    // app/Http/Controllers/ProductController.php
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            // ... otras validaciones
        ]);

        $product = new Product($request->except('main_image', 'gallery_images'));
        $product->save();

        $providerId = $request->user()->id;
        $productId = $product->id;
        $basePath = "products/{$providerId}/{$productId}";

        // Imagen principal
        if ($request->hasFile('main_image')) {
            $mainPath = $request->file('main_image')->store("public/{$basePath}");
            $product->image_url = str_replace('public/', '', $mainPath);
        }

        // Galería
        $galleryPaths = [];
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                $path = $image->store("public/{$basePath}/gallery");
                $galleryPaths[] = str_replace('public/', '', $path);
            }
        }
        $product->gallery_urls = $galleryPaths;
        $product->save();

        return response()->json(['success' => true]);
    }

    // /**
    //  * Muestra el formulario para crear un nuevo producto.
    //  */
    // public function create()
    // {
    //     return inertia('Provider/Products/Create');
    // }

    /**
     * Guarda un nuevo producto.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'price_usd' => 'required|numeric|min:0.01',
    //         'stock' => 'required|integer|min:0',
    //         'category' => 'required|string|max:100',
    //     ]);

    //     Auth::user()->products()->create([
    //         'name' => $request->name,
    //         'description' => $request->description,
    //         'price_usd' => $request->price_usd,
    //         'original_price_usd' => $request->price_usd, // opcional
    //         'stock' => $request->stock,
    //         'category' => $request->category,
    //         'in_stock' => $request->stock > 0,
    //     ]);

    //     return to_route('provider.products.index')->with('success', 'Producto creado correctamente.');
    // }

    /**
     * Muestra los detalles de un producto.
     */
    // public function show(Product $product)
    // {
    //     // Garantiza que el producto pertenezca al proveedor
    //     if ($product->user_id !== Auth::id()) {
    //         abort(403, 'No autorizado');
    //     }

    //     return inertia('Provider/Products/Show', compact('product'));
    // }

    /**
     * Muestra el formulario para editar un producto.
     */
    // public function edit(Product $product)
    // {
    //     if ($product->user_id !== Auth::id()) {
    //         abort(403, 'No autorizado');
    //     }

    //     return inertia('Provider/Products/Edit', compact('product'));
    // }

    /**
     * Actualiza un producto.
     */
    // public function update(Request $request, Product $product)
    // {
    //     if ($product->user_id !== Auth::id()) {
    //         abort(403, 'No autorizado');
    //     }

    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'price_usd' => 'required|numeric|min:0.01',
    //         'stock' => 'required|integer|min:0',
    //         'category' => 'required|string|max:100',
    //     ]);

    //     $product->update([
    //         'name' => $request->name,
    //         'description' => $request->description,
    //         'price_usd' => $request->price_usd,
    //         'stock' => $request->stock,
    //         'category' => $request->category,
    //         'in_stock' => $request->stock > 0,
    //     ]);

    //     return to_route('provider.products.index')->with('success', 'Producto actualizado correctamente.');
    // }

    /**
     * Elimina un producto.
     */
    // public function destroy(Product $product)
    // {
    //     if ($product->user_id !== Auth::id()) {
    //         abort(403, 'No autorizado');
    //     }

    //     $product->delete();

    //     return to_route('provider.products.index')->with('success', 'Producto eliminado correctamente.');
    // }
}
