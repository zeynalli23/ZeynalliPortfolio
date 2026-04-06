<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// İletişim formu API (frontend bu adrese POST atıyor)
Route::prefix('api')->group(function () {
    Route::post('/contact', [ContactController::class, 'send']);
});
