<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    protected $guard_name = 'web';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relaciones
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function userProfile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function providerProfile()
    {
        return $this->hasOne(ProviderProfile::class);
    }

    public function sellerProfile()
    {
        return $this->hasOne(SellerProfile::class);
    }

    // public function orders()
    // {
    //     return $this->hasMany(Order::class); // Ajusta según tu modelo real
    // }

    // // Si usas notificaciones personalizadas (no las de Laravel)
    // public function notifications()
    // {
    //     return $this->hasMany(UserNotification::class);
    // }

    // // Si usas la lista de deseos
    // public function wishlist()
    // {
    //     return $this->hasMany(WishlistItem::class);
    // }


    public function notifications()
    {
        return $this->hasMany(Notification::class)->orderBy('created_at', 'desc');
    }

    public function unreadNotifications()
    {
        return $this->notifications()->whereNull('read_at');
    }

    public function profile()
    {
        // Usamos hasOne porque un usuario tiene un único perfil
        return $this->hasOne(UserProfile::class);
    }
}
