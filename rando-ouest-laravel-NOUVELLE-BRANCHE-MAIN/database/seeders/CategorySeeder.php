<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name_category' => 'Historique',
        ]);

        Category::create([
            'name_category' => 'Nature et Faune',
        ]);

        Category::create([
            'name_category' => 'Familial',
        ]);

        Category::create([
            'name_category' => 'Aventure et Sports',
        ]);

        Category::create([
            'name_category' => 'Économie et Culture',
        ]);

        Category::create([
            'name_category' => 'Sciences et Techniques',
        ]);

        Category::create([
            'name_category' => 'Gastronomique',
        ]);

        Category::create([
            'name_category' => 'categorie name',
        ]);

        Category::factory(5)->create();
    }
}
