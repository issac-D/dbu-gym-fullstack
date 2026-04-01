<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Services\Profile\MemberDashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(private readonly MemberDashboardService $service)
    {
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Member dashboard loaded.',
            'data' => $this->service->build($request->user()),
        ]);
    }
}
