<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class UserSettingsController extends Controller
{
    public function index()
    {
        // Obtener configuración actual del usuario
        $config = auth()->user()->settings ?? [];

        // Datos estáticos para selectores
        $languages = [
            ['code' => 'es', 'name' => 'Español', 'flag' => '🇪🇸'],
            ['code' => 'en', 'name' => 'English', 'flag' => '🇺🇸'],
            ['code' => 'pt', 'name' => 'Português', 'flag' => '🇧🇷'],
            ['code' => 'fr', 'name' => 'Français', 'flag' => '🇫🇷']
        ];

        $timezones = [
            'America/Caracas',
            'America/New_York',
            'America/Los_Angeles',
            'Europe/London',
            'Europe/Paris',
            'Asia/Tokyo'
        ];

        $currencies = [
            ['code' => 'VES', 'name' => 'Bolívar Venezolano', 'symbol' => 'Bs.S'],
            ['code' => 'USD', 'name' => 'Dólar Estadounidense', 'symbol' => '$'],
            ['code' => 'EUR', 'name' => 'Euro', 'symbol' => '€']
        ];

        // Configuración por defecto
        $defaultConfig = [
            // Información personal
            'email' => auth()->user()->email,
            'phone' => auth()->user()->phone ?? '',
            'firstName' => auth()->user()->first_name ?? '',
            'lastName' => auth()->user()->last_name ?? '',
            'birthDate' => auth()->user()->birth_date ?? '',
            'gender' => auth()->user()->gender ?? 'prefer-not-to-say',

            // Notificaciones
            'orderNotifications' => $config['orderNotifications'] ?? true,
            'promotionNotifications' => $config['promotionNotifications'] ?? true,
            'reviewNotifications' => $config['reviewNotifications'] ?? false,
            'accountNotifications' => $config['accountNotifications'] ?? true,
            'emailNotifications' => $config['emailNotifications'] ?? true,
            'pushNotifications' => $config['pushNotifications'] ?? true,
            'smsNotifications' => $config['smsNotifications'] ?? false,

            // Privacidad
            'publicProfile' => $config['publicProfile'] ?? false,
            'shareData' => $config['shareData'] ?? true,
            'marketingEmails' => $config['marketingEmails'] ?? true,
            'thirdPartyCookies' => $config['thirdPartyCookies'] ?? false,

            // Idioma y región
            'language' => $config['language'] ?? 'es',
            'timezone' => $config['timezone'] ?? 'America/Caracas',
            'currency' => $config['currency'] ?? 'VES',
            'measurement' => $config['measurement'] ?? 'metric',

            // Seguridad
            'twoFactorEnabled' => $config['twoFactorEnabled'] ?? false,
            'lastPasswordChange' => auth()->user()->last_password_change ?? 'Nunca',
            'activeSessions' => 1, // Esto lo implementarás después

            // Preferencias
            'newsletter' => $config['newsletter'] ?? true,
            'productRecommendations' => $config['productRecommendations'] ?? true,
            'savePaymentInfo' => $config['savePaymentInfo'] ?? true,
            'autoPlayVideos' => $config['autoPlayVideos'] ?? false,
            'darkMode' => $config['darkMode'] ?? false,
        ];

        return Inertia::render('Users/Settings/SettingsPage', [
            'config' => $defaultConfig,
            'languages' => $languages,
            'timezones' => $timezones,
            'currencies' => $currencies
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'section' => 'required|string',
            'data' => 'required|array'
        ]);

        // Obtener configuración actual
        $settings = auth()->user()->settings ?? [];

        // Fusionar nuevos datos
        $settings = array_merge($settings, $request->data);

        // Guardar en el modelo User (asumiendo que tienes una columna 'settings' JSON)
        auth()->user()->update(['settings' => $settings]);

        return response()->json(['success' => true, 'message' => 'Configuración actualizada correctamente']);
    }

    public function updatePersonalInfo(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
            'phone' => 'nullable|string|max:20',
            'birthDate' => 'nullable|date',
            'gender' => 'required|in:male,female,other,prefer-not-to-say'
        ]);

        auth()->user()->update([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'phone' => $request->phone,
            'birth_date' => $request->birthDate,
            'gender' => $request->gender
        ]);

        return response()->json(['success' => true, 'message' => 'Información personal actualizada']);
    }
}
