<?php

namespace App\Http\Controllers;

use App\Models\Brief;
use Illuminate\Http\Request;

class BriefController extends Controller
{
    /**
     * Store a new brief from the landing page.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Auto-generate realistic metadata to show on the admin dashboard
        // Parse company name from email domain
        $domain = substr(strrchr($validated['email'], "@"), 1);
        $company = null;
        if ($domain && !in_array($domain, ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'])) {
            $parts = explode('.', $domain);
            $company = ucwords($parts[0] ?? 'Agency');
        } else {
            $company = 'Freelance / Personal';
        }

        // Random budget generator
        $budgets = ['IDR 150M', 'IDR 300M', 'IDR 500M', 'IDR 750M', 'IDR 1.2B'];
        $budget = $budgets[array_rand($budgets)];

        // Simple keyword-based tech stack generator
        $techKeywords = [
            'laravel' => 'Laravel',
            'react' => 'React',
            'vue' => 'Vue',
            'tailwind' => 'Tailwind',
            'sqlite' => 'SQLite',
            'postgres' => 'PostgreSQL',
            'mysql' => 'MySQL',
            'next' => 'Next.js',
            'vite' => 'Vite',
            'inertia' => 'Inertia',
            'api' => 'REST API',
            'security' => 'Security',
            'docker' => 'Docker',
            'node' => 'Node.js',
        ];

        $stack = [];
        $lowerMessage = strtolower($validated['message']);
        $lowerName = strtolower($validated['name']);
        
        foreach ($techKeywords as $key => $value) {
            if (str_contains($lowerMessage, $key) || str_contains($lowerName, $key)) {
                $stack[] = $value;
            }
        }

        // Ensure we always have some stacks if no keywords match
        if (empty($stack)) {
            $stack = ['Laravel', 'React', 'Tailwind'];
        }

        Brief::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'company' => $company,
            'budget' => $budget,
            'message' => $validated['message'],
            'tech_stack' => $stack,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Brief submitted successfully!');
    }

    /**
     * Update the status of a brief from the admin dashboard.
     */
    public function updateStatus(Request $request, Brief $brief)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,discussion,approved',
        ]);

        $brief->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back();
    }

    /**
     * Delete a brief from the admin dashboard.
     */
    public function destroy(Brief $brief)
    {
        $brief->delete();

        return redirect()->back();
    }
}
