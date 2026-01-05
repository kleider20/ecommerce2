<?php

// app/Http/Controllers/OrderController.php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Notification;
use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function show(Order $order)
    {
        $order->load('items');

        return Inertia::render('Orders/OrdersShow', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'status_label' => $order->status_label,
                'status_color' => $order->status_color,
                'total' => $order->total,
                'created_at_formatted' => $order->formatted_created_at,
                'shipping_address' => $order->shipping_address,
                'items' => $order->items->map(fn($item) => [
                    'product_name' => $item->product_name,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'total' => $item->total,
                ]),
            ]
        ]);
    }
}
