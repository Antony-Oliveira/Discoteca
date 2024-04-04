<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'store']);
Route::get('/albums', [AlbumController::class, 'index']);
Route::get('/album/{album}', [AlbumController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/track/add', [TrackController::class, 'store']);
    Route::delete('/track/{track}/delete', [TrackController::class, 'destroy']);
    Route::delete('/album/{album}/delete', [AlbumController::class, 'destroy']);
    Route::post('/album/add', [AlbumController::class, 'store']);
    Route::post('/user/{user}/logout', [AuthController::class, 'logout']);
});
