<?php
// app/Http/Middleware/Concerns/SharesNotifications.php
namespace App\Http\Middleware\Concerns;

use App\Models\Notification;

trait SharesNotifications
{
    protected function getNotificationsData($userId)
    {
        $notifications = Notification::where('user_id', $userId)
            ->whereNull('read_at')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn($n) => [
                'id' => $n->id,
                'type' => $n->type,
                'message' => $n->message,
                'time' => $n->created_at->diffForHumans(),
                'read' => false,
                'details' => $n->details,
            ])->all();

        return [
            'globalNotifications' => $notifications,
            'unreadGlobalNotificationsCount' => count($notifications)
        ];
    }
}
