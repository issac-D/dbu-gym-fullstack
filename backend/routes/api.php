<?php

use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Member\ProfileController as MemberProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->middleware('guest');
    Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function (Request $request) {
        return response()->json([
            'message' => 'Admin access granted.',
            'user' => $request->user(),
        ]);
    });

    Route::get('/profile', [AdminProfileController::class, 'show']);
    Route::put('/profile', [AdminProfileController::class, 'update']);
    Route::post('/profile/avatar', [AdminProfileController::class, 'updateAvatar']);
    Route::put('/password', [AdminProfileController::class, 'updatePassword']);
});

Route::middleware(['auth:sanctum', 'role:member'])->prefix('member')->group(function () {
    Route::get('/profile', [MemberProfileController::class, 'show']);
    Route::put('/profile', [MemberProfileController::class, 'update']);
    Route::post('/profile/avatar', [MemberProfileController::class, 'updateAvatar']);
    Route::put('/password', [MemberProfileController::class, 'updatePassword']);
});
