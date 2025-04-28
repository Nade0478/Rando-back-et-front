<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title_article' => $this->faker->sentence,
            'date_article' => $this->faker->date('Y-m-d'),
            'content_article' => $this->faker->paragraph,
            'image_article' => $this->faker->imageUrl(640, 480, 'articles', true),
            'user_id' => 2,
            'category_id' => Category::factory(),
        ];
    }
}
