<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Place::create([
            'name_place' => 'Place 1',
            'longitude_place' => '45.80',
            'latitude_place' => '4.87',
            'description_place' => 'Description de la place 1',
            'image_place' => 'place1.jpg',
            'map_place' => 'place1_map.jpg',
            'distance_place' => '10',
            'difficulty_place' => 'Facile',
            'estimated_time_place' => '08:00',
        ]);

        // Create 30 random places
        Place::factory()->count(30)->create();
    }
}
