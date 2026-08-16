<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@turoturo.test'],
            [
                'name'              => 'Sunday',
                'password'          => Hash::make('change-this-password'),
                'email_verified_at' => now(),
            ]
        );
    }
}