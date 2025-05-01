<?php

namespace Database\Seeders;

use App\Models\Manage_place;
use App\Models\ManagePlace;
use Illuminate\Database\Seeder;

class Manage_placeSeeder extends Seeder {
    public function run() {
        $user_id = 11;
        $place_id = 7;

        $exists = Manage_place::where('user_id', $user_id)
                            ->where('place_id', $place_id)
                            ->exists();

        if (!$exists) {
            Manage_place::create([
                'user_id' => $user_id,
                'place_id' => $place_id,
                'updated_at' => now(),
                'created_at' => now(),
            ]);
        } else {
            echo " L'entrée (user_id: $user_id, place_id: $place_id) existe déjà.";
        }
    }
}
