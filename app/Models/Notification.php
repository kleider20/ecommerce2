<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Events\NotificationCreated;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'message',
        'action_url',
        'details',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'details' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function markAsRead()
    {
        $this->update(['read_at' => now()]);
    }

    public function getIsReadAttribute(): bool
    {
        return !is_null($this->read_at);
    }

    // 👇 Método para crear y disparar notificación
    public static function createWithBroadcast(array $attributes)
    {
        $notification = self::create($attributes);
        broadcast(new NotificationCreated($notification));
        return $notification;
    }
}
