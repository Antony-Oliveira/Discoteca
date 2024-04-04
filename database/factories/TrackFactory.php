<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Track>
 */
class TrackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cover_url' => $this->faker->imageUrl(), // Gera uma URL de imagem aleatória
            'name' => $this->faker->sentence(), // Gera um nome aleatório
            'duration' => $this->faker->time(), // Gera uma duração aleatória
            'album_id' => 1
        ];
    }
}
