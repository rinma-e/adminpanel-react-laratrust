<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Admini',
            'email' => 'admin@t',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'avatar'=>null,
        ])->addRole('super-admin'); // here add your role

        User::create([
            'first_name' => 'Test',
            'last_name' => 'Testing',
            'email' => 'test@t',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'avatar'=>null,
        ])->addRole('admin');
    }
}
