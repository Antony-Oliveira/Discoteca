<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->string("cover_url")->nullable(true)->default("https://cdn3.vectorstock.com/i/1000x1000/48/67/photo-album-cover-template-vector-10084867.jpg");
            $table->string("background_url")->nullable(true)->default("https://cdn3.vectorstock.com/i/1000x1000/48/67/photo-album-cover-template-vector-10084867.jpg");
            $table->string("description");
            $table->string('name')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('albums');
    }
};
