<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()
            ->notifications()
            ->latest()
            ->paginate(20)
            ->through(fn($n) => [
                'id' => $n->id,
                'type' => $n->type,
                'message' => $n->message,
                'time' => $n->created_at->diffForHumans(),
                'read' => !is_null($n->read_at),
                'details' => $n->details,
            ]);

        return Inertia::render('Notifications/NotificationsIndex', [
            'notifications' => $notifications,
        ]);
    }

    public function show(Notification $notification)
    {
        // Verificar ownership
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Notifications/NotificationsShow', [
            'notification' => [
                'id' => $notification->id,
                'type' => $notification->type,
                'message' => $notification->message,
                'time' => $notification->created_at->diffForHumans(),
                'read' => !is_null($notification->read_at),
                'details' => $notification->details,
            ]
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }
        $notification->markAsRead();
        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications()->update(['read_at' => now()]);
        return response()->json(['success' => true]);
    }

    public function destroy(Notification $notification)
    {
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }
        $notification->delete();
        return response()->json(['success' => true]);
    }
}
