<?php

// database/factories/ProductFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use App\Models\Product;
use App\Models\User;
use App\Models\Category;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        // 👇 Crear instancia de Faker manualmente
        $faker = \Faker\Factory::create();

        $brands = [
            'computadoras' => ['ASUS', 'Dell', 'HP', 'Lenovo', 'Apple'],
            'monitores'    => ['LG', 'Samsung', 'Dell'],
            'accesorios'   => ['Logitech', 'Corsair', 'Razer'],
            'ropa'         => ['Nike', 'Adidas', 'Puma'],
            'calzados'     => ['Nike', 'Adidas', 'Puma'],
            'hogar'        => ['Philips', 'IKEA', '3M'],
        ];

        $categorySlugs = array_keys($brands);
        $slug = $faker->randomElement($categorySlugs);
        $category = Category::where('slug', $slug)->first() ?? Category::first();

        if (!$category) {
            $category = Category::factory()->create(['slug' => 'otros']);
        }

        $brand = $faker->randomElement($brands[$slug]);

        return [
            'user_id' => User::role('proveedor')->inRandomOrder()->value('id')
                        ?? User::inRandomOrder()->value('id'),
            'name' => $faker->sentence(4, true),
            'description' => $faker->paragraph(),
            'category_id' => $category->id,
            'brand' => $brand,
            'price_usd' => $faker->randomFloat(2, 10, 2000),
            'original_price_usd' => $faker->boolean(40) ? $faker->randomFloat(2, 15, 2500) : null,
            'stock' => $faker->numberBetween(0, 100),
            'in_stock' => $faker->boolean(90),
            'is_active' => true,
            'is_bestseller' => $faker->boolean(20),
            'is_new' => $faker->boolean(30),
            'rating' => $faker->randomFloat(2, 3, 5),
            'review_count' => $faker->numberBetween(0, 500),
            'free_shipping' => $faker->boolean(60),
            'warranty' => $faker->randomElement(['1 año', '2 años', null]),
            'price_per_unit' => $faker->randomElement(['/unidad', '/kg', null]),
            'sku' => 'SKU-' . strtoupper($faker->lexify('??????')),
            'image_url' => function (array $attributes) {
                $category = Category::find($attributes['category_id']);
                $categoryName = $category ? $category->name : 'Producto';
                $brand = $attributes['brand'] ?? 'Marca';
                return "https://placehold.co/600x400?text=" . urlencode("{$brand} {$categoryName}");
            },
        ];
    }
}
