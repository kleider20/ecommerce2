<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Role;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        // ✅ Carga TODOS los roles con show_in_register = true (dinámico)
        $roles = Role::with('metadata')
            ->whereHas('metadata', fn($q) => $q->where('show_in_register', true))
            ->get()
            ->map(function ($role) {
                return [
                    'name' => $role->name,
                    'display_name' => $role->display_name,
                    'description' => $role->description,
                    'color' => $role->color,
                    'icon' => $role->icon,
                    'background_color' => $role->metadata?->background_color ?? '#ffffff',
                ];
            });

        return Inertia::render('Auth/Register', [
            'roles' => $roles,
        ]);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string', // 👈 Dinámico: cualquier string
        ]);

        // ✅ Validar que el rol existe y está habilitado para registro
        $role = Role::with('metadata')
            ->where('name', $request->role)
            ->whereHas('metadata', fn($q) => $q->where('show_in_register', true))
            ->first();

        if (!$role) {
            return back()->withErrors(['role' => 'El rol seleccionado no es válido.']);
        }

        // ✅ Validar campos comunes (aplican a todos los roles)
        $commonRules = [
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
        ];

        // ✅ Validar campos específicos del rol (si existen en metadata)
        $customRules = [];
        $roleFields = $role->metadata?->registration_fields ?? [];

        foreach ($roleFields as $field => $rules) {
            $customRules[$field] = $rules;
        }

        $request->validate(array_merge($commonRules, $customRules));

        // 1. Crear usuario base
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2. Asignar rol
        $user->assignRole($request->role);

        // 3. Crear perfil base (común a todos)
        $user->profile()->create($request->only([
            'phone', 'address', 'date_of_birth'
        ]));

        // 4. ✅ Guardar datos específicos del rol en su tabla correspondiente
        $this->saveRoleSpecificData($user, $request, $role);

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Guarda los datos específicos de un rol en su tabla correspondiente.
     */
    private function saveRoleSpecificData(User $user, Request $request, Role $role): void
    {
        // Mapa de roles a modelos/tablas
        $roleModelMap = [
            'user' => 'App\Models\UserProfile', // No tiene tabla específica
            'proveedor' => 'App\Models\ProviderProfile',
            'vendedor' => 'App\Models\SellerProfile',
            // Añade aquí nuevos roles en el futuro:
            // 'delivery' => 'App\Models\DeliveryProfile',
        ];

        $modelName = $roleModelMap[$role->name] ?? null;

        if ($modelName && class_exists($modelName)) {
            $fields = $role->metadata?->registration_fields ?? [];
            $data = $request->only(array_keys($fields));
            $user->{$modelName::make()->getTable() . 's'}()->create($data);
        }
    }
}
