<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Place>
 */
class PlaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_place' => $this->faker->name,
            'description_place' => $this->faker->text,
            'latitude_place' => $this->faker->latitude(-90, 90),
            'longitude_place' => $this->faker->longitude(-180, 180),
            'image_place' => $this->faker->imageUrl(640, 480, 'articles', true),
            'map_place' => $this->faker->imageUrl(640, 480, 'articles', true),
            'distance_place' => $this->faker->randomFloat(2, 0, 100),
            'difficulty_place' => $this->faker->randomElement(['Débutant', 'Intermédiaire', 'Expert']),
            'estimated_time_place' => $this->faker->time('H:i'),
        ];
    }
}
