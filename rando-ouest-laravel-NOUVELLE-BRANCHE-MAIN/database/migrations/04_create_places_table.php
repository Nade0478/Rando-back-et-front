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
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->string('name_place');
            $table->decimal('longitude_place');
            $table->decimal('latitude_place');
            $table->text('description_place');
            $table->string('image_place');
            $table->string('map_place');
            $table->integer('distance_place');
            $table->string('difficulty_place');
            $table->time('estimated_time_place');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
