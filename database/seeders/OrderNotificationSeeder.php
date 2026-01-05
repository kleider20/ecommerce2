<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Notification;
use App\Events\NotificationCreated;
use Illuminate\Support\Facades\DB;


class OrderNotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener usuarios existentes (solo roles 'user')
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', 'super_admin');
        })->get();

        if ($users->isEmpty()) {
            $this->command->info('No se encontraron usuarios con rol "user" para crear pedidos.');
            return;
        }

        foreach ($users as $user) {
            // Crear 1-3 pedidos por usuario
            $orderCount = rand(1, 3);

            for ($i = 0; $i < $orderCount; $i++) {
                DB::transaction(function () use ($user) {
                    // Crear pedido
                    $order = Order::create([
                        'user_id' => $user->id,
                        'order_number' => 'ORD-' . date('Y') . '-' . strtoupper(uniqid()),
                        'status' => $this->getRandomStatus(),
                        'total' => rand(50, 500) + (rand(0, 99) / 100),
                        'shipping_address' => 'Calle Falsa ' . rand(1, 1000) . ', Ciudad, País'
                    ]);

                    // Crear items del pedido (1-5 items)
                    $itemCount = rand(1, 5);
                    $total = 0;

                    for ($j = 0; $j < $itemCount; $j++) {
                        $price = rand(10, 200) + (rand(0, 99) / 100);
                        $quantity = rand(1, 3);
                        $itemTotal = $price * $quantity;
                        $total += $itemTotal;

                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => 1, // Asumiendo que existe el producto con ID 1
                            'product_name' => $this->getRandomProductName(),
                            'price' => $price,
                            'quantity' => $quantity,
                            'total' => $itemTotal
                        ]);
                    }

                    // Actualizar total del pedido
                    $order->update(['total' => $total]);

                    // // Crear notificación
                    // $notification = Notification::create([
                    //     'user_id' => $user->id,
                    //     'type' => 'order',
                    //     'message' => "Tu pedido #{$order->order_number} ha sido {$this->getStatusMessage($order->status)}",
                    //     'action_url' => "/orders/{$order->id}",
                    //     'details' => [
                    //         'orderId' => $order->id,
                    //         'orderNumber' => $order->order_number,
                    //         'trackingNumber' => 'TRK' . rand(100000000, 999999999),
                    //         'estimatedDelivery' => now()->addDays(rand(2, 7))->format('Y-m-d'),
                    //         'items' => [
                    //             ['name' => 'Producto de prueba', 'quantity' => 1, 'price' => '$' . number_format($total, 2)]
                    //         ],
                    //         'total' => '$' . number_format($total, 2)
                    //     ]
                    // ]);

                    $notification = Notification::create([
                        'user_id' => $user->id,
                        'type' => 'order',
                        'message' => "Tu pedido #{$order->order_number} ha sido {$this->getStatusMessage($order->status)}",
                        'action_url' => null, // 👈 Eliminar esta línea o dejar null
                        'details' => [
                            'orderId' => $order->id,
                            'orderNumber' => $order->order_number,
                            'trackingNumber' => 'TRK' . rand(100000000, 999999999),
                            'estimatedDelivery' => now()->addDays(rand(2, 7))->format('Y-m-d'),
                            'items' => [
                                ['name' => 'Producto de prueba', 'quantity' => 1, 'price' => '$' . number_format($total, 2)]
                            ],
                            'total' => '$' . number_format($total, 2)
                        ]
                    ]);

                    // Disparar evento para notificaciones en tiempo real (opcional en seeder)
                    broadcast(new NotificationCreated($notification));
                });
            }
        }

        $this->command->info('✅ Pedidos y notificaciones creados exitosamente para ' . $users->count() . ' usuarios.');
    }

    private function getRandomStatus()
    {
        $statuses = ['pending', 'processing', 'shipped', 'delivered'];
        return $statuses[array_rand($statuses)];
    }

    private function getStatusMessage($status)
    {
        return match($status) {
            'pending' => 'creado',
            'processing' => 'procesado',
            'shipped' => 'enviado',
            'delivered' => 'entregado',
            default => 'creado'
        };
    }

    private function getRandomProductName()
    {
        $products = [
            'Auriculares Bluetooth',
            'Cable USB-C',
            'Mouse Inalámbrico',
            'Teclado Mecánico',
            'Monitor LED 24"',
            'Laptop Gaming',
            'Tablet Android',
            'Smartphone 5G',
            'Cargador Portátil',
            'Adaptador HDMI'
        ];
        return $products[array_rand($products)];
    }
}
