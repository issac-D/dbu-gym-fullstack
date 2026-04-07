<?php

use App\Http\Controllers\Admin\ApprovalsController as AdminApprovalsController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\MembersController as AdminMembersController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\SystemSettingsController as AdminSystemSettingsController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Member\DashboardController as MemberDashboardController;
use App\Http\Controllers\Member\MembershipController as MemberMembershipController;
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
    Route::get('/dashboard', [AdminDashboardController::class, 'show']);
    Route::get('/members', [AdminMembersController::class, 'index']);
    Route::post('/members', [AdminMembersController::class, 'store']);
    Route::put('/members/{user}', [AdminMembersController::class, 'update']);
    Route::patch('/members/{user}/status', [AdminMembersController::class, 'setStatus']);
    Route::get('/approvals', [AdminApprovalsController::class, 'index']);
    Route::get('/approvals/history', [AdminApprovalsController::class, 'history']);
    Route::get('/approvals/export', [AdminApprovalsController::class, 'export']);
    Route::get('/approvals/history/export', [AdminApprovalsController::class, 'exportHistory']);
    Route::post('/approvals/{user}/approve', [AdminApprovalsController::class, 'approve']);
    Route::post('/approvals/{user}/reject', [AdminApprovalsController::class, 'reject']);
    Route::get('/settings', [AdminSystemSettingsController::class, 'show']);
    Route::put('/settings', [AdminSystemSettingsController::class, 'update']);
    Route::post('/settings/logo', [AdminSystemSettingsController::class, 'updateLogo']);

    Route::get('/profile', [AdminProfileController::class, 'show']);
    Route::put('/profile', [AdminProfileController::class, 'update']);
    Route::post('/profile/avatar', [AdminProfileController::class, 'updateAvatar']);
    Route::put('/password', [AdminProfileController::class, 'updatePassword']);
});

Route::middleware(['auth:sanctum', 'role:member'])->prefix('member')->group(function () {
    Route::get('/dashboard', [MemberDashboardController::class, 'show']);
    Route::post('/renew', [MemberMembershipController::class, 'renew']);
    Route::get('/profile', [MemberProfileController::class, 'show']);
    Route::put('/profile', [MemberProfileController::class, 'update']);
    Route::post('/profile/avatar', [MemberProfileController::class, 'updateAvatar']);
    Route::put('/password', [MemberProfileController::class, 'updatePassword']);
});
