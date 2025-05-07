// <?php

// namespace Category\Tests\Feature;

// use Tests\TestCase;
// use App\Models\Category;
// use Illuminate\Foundation\Testing\RefreshDatabase;

// class CategoryTest extends TestCase
// {
//     use RefreshDatabase; // Réinitialise la base de données entre les tests

//     /** @test */
//     public function it_can_list_categories()
//     {
//         Category::factory()->count(3)->create(); // Crée des catégories fictives

//         $response = $this->getJson('/api/categories');

//         $response->assertStatus(200)
//                  ->assertJsonCount(3);
//     }

//     /** @test */
//     public function it_can_create_a_category()
//     {
//         $data = ['name_category' => 'Test Category'];

//         $response = $this->postJson('/api/categories', $data);

//         $response->assertStatus(201)
//                  ->assertJsonFragment($data);
//     }
// }
