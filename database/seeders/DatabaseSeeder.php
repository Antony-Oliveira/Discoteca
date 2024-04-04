<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Album;
use App\Models\Track;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();



        Album::factory()->create([
            'name' => 'Album 0',
            'cover_url' => 'https://example.com/capa.jpg',
        ]);

        Track::factory(5)->create();
    }
}
