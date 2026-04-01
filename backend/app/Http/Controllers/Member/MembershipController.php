<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\RenewMembershipRequest;
use App\Services\Membership\MembershipService;
use App\Services\Profile\MemberDashboardService;
use Illuminate\Http\JsonResponse;

class MembershipController extends Controller
{
    public function __construct(
        private readonly MembershipService $membershipService,
        private readonly MemberDashboardService $dashboardService
    ) {
    }

    public function renew(RenewMembershipRequest $request): JsonResponse
    {
        $plan = $request->input('membership_type');
        $user = $this->membershipService->renew($request->user(), $plan);

        return response()->json([
            'message' => 'Membership renewed successfully.',
            'data' => $this->dashboardService->build($user),
        ]);
    }
}
