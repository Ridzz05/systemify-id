<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $dbPath = database_path('database.sqlite');
    $dbSize = file_exists($dbPath) ? round(filesize($dbPath) / 1024) . ' KB' : 'N/A';

    return Inertia::render('Dashboard', [
        'briefs' => \App\Models\Brief::latest()->get(),
        'dbSize' => $dbSize,
        'adminCount' => \App\Models\User::count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/briefs', [\App\Http\Controllers\BriefController::class, 'store'])->name('briefs.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Brief actions
    Route::patch('/briefs/{brief}/status', [\App\Http\Controllers\BriefController::class, 'updateStatus'])->name('briefs.update-status');
    Route::delete('/briefs/{brief}', [\App\Http\Controllers\BriefController::class, 'destroy'])->name('briefs.destroy');
});

require __DIR__.'/auth.php';
