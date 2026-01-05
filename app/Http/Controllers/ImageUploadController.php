<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\UserProfile;

use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

use Exception;

class ImageUploadController extends Controller
{
    /**
     * Sube y actualiza el avatar en la tabla user_profiles
     */
    public function uploadAvatar(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);

            $user = auth()->user();
            $profile = UserProfile::firstOrCreate(['user_id' => $user->id]);

            $image = $request->file('image');
            $filename = 'avatar-' . time() . '.webp';
            $folder = "avatars/{$user->id}";

            // ✅ Inicializar con ImageManager (v3+)
            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);

            // ✅ Redimensionar manteniendo proporción
            $img->resize(500, 500, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            // ✅ Codificar a WebP
            $encoded = $img->toWebp(85)->toString();

            Storage::disk('public')->put("{$folder}/{$filename}", $encoded);

            // Eliminar avatar anterior
            if ($profile->avatar && Storage::disk('public')->exists($profile->avatar)) {
                Storage::disk('public')->delete($profile->avatar);
            }

            $profile->update(['avatar' => "{$folder}/{$filename}"]);

            return response()->json([
                'success' => true,
                'url' => asset('storage/' . $profile->avatar),
                'path' => $profile->avatar
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar imágenes (General)
     */
    public function destroy(Request $request)
    {
        $request->validate(['path' => 'required|string']);

        if (Storage::disk('public')->exists($request->path)) {
            Storage::disk('public')->delete($request->path);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Archivo no encontrado'], 404);
    }
}

