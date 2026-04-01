<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminDashboardService;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __construct(private readonly AdminDashboardService $service)
    {
    }

    public function show(): JsonResponse
    {
        return response()->json([
            'message' => 'Admin dashboard loaded.',
            'data' => $this->service->build(),
        ]);
    }
}
