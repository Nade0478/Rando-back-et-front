<?php

namespace Database\Seeders;

use App\Models\Manage_place;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Manage_placeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Manage_place::factory()->count(10)->create();
    }
}
