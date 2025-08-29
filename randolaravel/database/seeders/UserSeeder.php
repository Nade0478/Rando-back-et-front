<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    public function run()
    {

        // Create the admin user and assign them the admin role
        User::create([
            'name' => 'Administrateur',
            'email' => 'admin@truc.fr',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'role_id' => 1

        ]);
        // $admin->role()->attach($adminRole);

        // Create the standard user and assign them the user role
        User::create([
            'name' => 'User',
            'email' => 'user@truc.fr',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'role_id' => 2
        ]);

        User::factory(8)->create();
        // $user->role()->attach($userRole);
    }
}
