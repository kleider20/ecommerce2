<?php

// app/Http/Controllers/ImageUploadController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Product;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'product_id' => 'required|integer|exists:products,id',
        ]);

        // Obtener el producto y su proveedor
        $product = Product::with('user')->findOrFail($request->product_id);
        $providerId = $product->user_id;
        $productId = $product->id;

        // Carpeta específica: products/{provider_id}/{product_id}
        $folder = "products/{$providerId}/{$productId}";

        // Generar nombre único
        $file = $request->file('image');
        $filename = 'main-' . time() . '.' . $file->getClientOriginalExtension();

        // Guardar en storage/app/public/
        $path = $file->storeAs("public/{$folder}", $filename);

        return response()->json([
            'success' => true,
            'url' => Storage::url(str_replace('public/', '', $path)), // URL pública
            'path' => str_replace('public/', '', $path) // Ruta relativa para BD
        ]);
    }

    public function destroy(Request $request)
    {
        $request->validate(['path' => 'required|string']);

        // Validar ruta segura
        if (preg_match('/^[a-zA-Z0-9\/._-]+$/', $request->path) &&
            strpos($request->path, '..') === false) {

            $fullPath = 'public/' . $request->path;
            if (Storage::exists($fullPath)) {
                Storage::delete($fullPath);
                return response()->json(['success' => true]);
            }
        }

        return response()->json(['success' => false], 404);
    }
}
