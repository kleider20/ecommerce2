<?php
// app/Http/Controllers/SuperAdmin/GeneralSettingController.php
namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\GeneralSetting;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class GeneralSettingController extends Controller
{
    public function edit()
    {
        $settings = GeneralSetting::instance();
        $countries = Country::where('is_active', true)
            ->orderBy('name')
            ->get(['iso2', 'name', 'currency_code', 'currency_name', 'currency_symbol', 'timezone', 'language_name', 'locale']);

        return Inertia::render('SuperAdmin/Settings/GeneralEdit', [
            'settings' => $settings,
            'countries' => $countries,
        ]);
    }

    public function update(Request $request)
    {
        // Validación: incluir base_currency_code
        $request->validate([
            'site_name' => 'required|string|max:100',
            'operating_country_iso2' => 'required|exists:countries,iso2',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'maintenance_mode' => 'boolean',
            'maintenance_message' => 'nullable|string|max:255',
        ]);

        // Actualizar el registro único
        $settings = GeneralSetting::first(); // siempre hay uno gracias a firstOrCreate

        // Guardar logo
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $settings->logo_path = $path;
        }
        $settings->update($request->only([
            'site_name',
            'operating_country_iso2',
            'base_currency_code',
            'maintenance_mode',
            'maintenance_message',
        ]));

        // Limpiar caché y aplicar cambios
        Cache::forget('general_settings');
        GeneralSetting::apply();

        return back()->with('success', 'Configuración general actualizada correctamente.');
    }

    public function updateLayoutYear(Request $request)
    {
        $request->validate([
            'active_layout_year' => 'required|string|in:2024,2025,2026,2027'
        ]);

        GeneralSetting::firstOrCreate([])->update([
            'active_layout_year' => $request->active_layout_year
        ]);

        return to_route('admin.settings')->with('success', 'Layout actualizado');
    }
}
