<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brief;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin Systemify',
            'email' => 'admin@systemify.id',
            'password' => bcrypt('password'),
        ]);

        Brief::create([
            'name' => 'Hendra Wijaya',
            'email' => 'hendra@nusantara.co.id',
            'company' => 'Nusantara Retail',
            'budget' => 'IDR 350M',
            'message' => 'We want to scale our retail synchronization backend with Laravel, using SQLite replicas for local cache. Need high reliability and real-time inventory updates.',
            'tech_stack' => ['Laravel', 'SQLite', 'Tailwind', 'REST API'],
            'status' => 'pending',
            'created_at' => now()->subHours(2),
        ]);

        Brief::create([
            'name' => 'Nadia Utami',
            'email' => 'nadia@sinergilogistics.com',
            'company' => 'Sinergi Logistics',
            'budget' => 'IDR 850M',
            'message' => 'Looking to build a real-time fleet delivery tracker using React and custom mapping APIs. Need a web panel and integration with Inertia.',
            'tech_stack' => ['React', 'Vite', 'Inertia', 'Tailwind', 'PHP'],
            'status' => 'discussion',
            'created_at' => now()->subHours(5),
        ]);

        Brief::create([
            'name' => 'Rian Pramana',
            'email' => 'rian@astrafintech.id',
            'company' => 'Astra FinTech',
            'budget' => 'IDR 1.2B',
            'message' => 'High-security API layer development for our microservice architecture. Requires extensive security logging and Laravel backend engineering.',
            'tech_stack' => ['Laravel', 'REST API', 'SQLite', 'Security'],
            'status' => 'approved',
            'created_at' => now()->subDays(1),
        ]);
    }
}
