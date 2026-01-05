<?php

namespace App\Events;

use App\Models\Notification;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationCreated implements ShouldBroadcast // 👈 ¡ESTO ES CLAVE!
{
    use Dispatchable, SerializesModels;

    public function __construct(public Notification $notification)
    {
    }

    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('notifications.' . $this->notification->user_id);
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->notification->id,
            'type' => $this->notification->type,
            'message' => $this->notification->message,
            'time' => $this->notification->created_at->diffForHumans(),
            'read' => false,
            'action_url' => $this->notification->action_url,
            'details' => $this->notification->details,
        ];
    }

    // 👇 Opcional: Personalizar el nombre del evento
    public function broadcastAs(): string
    {
        return 'NotificationCreated';
    }
}
