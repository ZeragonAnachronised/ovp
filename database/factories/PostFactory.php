<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        $images = [
            'istockphoto-1161610609-1024x1024.jpg',
            'istockphoto-1197996070-1024x1024.jpg',
            'istockphoto-186534154-1024x1024.jpg',
            'istockphoto-471926619-1024x1024.jpg',
            'istockphoto-483076291-1024x1024.jpg',
            'istockphoto-483724081-1024x1024.jpg',
            'istockphoto-495508534-1024x1024.jpg',
            'istockphoto-501057465-1024x1024.jpg',
            'istockphoto-537361232-1024x1024.jpg',
            'istockphoto-588603424-1024x1024.jpg',
            'istockphoto-825148240-1024x1024.jpg',
            'istockphoto-912159408-1024x1024.jpg',
        ];

        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'image' => 'img/' . $this->faker->randomElement($images),
        ];
    }
}
