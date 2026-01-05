<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class UserProfile extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'avatar',
        'document_type',
        'document_number',
        'first_name',
        'middle_name',
        'first_surname',
        'second_surname',
        'country_id',
        'state_id',
        'city',
        'address',
        'postal_code',
        'phone',
        'date_of_birth',
        'gender'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    // Esto hace que avatar_url esté disponible en el JSON de Inertia
    protected $appends = ['avatar_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar && Storage::disk('public')->exists($this->avatar)) {
            return asset('storage/' . $this->avatar); // 👈 URL absoluta
        }

        $name = urlencode($this->first_name ?
            "{$this->first_name} {$this->first_surname}" :
            ($this->user->name ?? 'U')
        );
        return "https://ui-avatars.com/api/?name={$name}&background=3b82f6&color=fff";
    }
}
