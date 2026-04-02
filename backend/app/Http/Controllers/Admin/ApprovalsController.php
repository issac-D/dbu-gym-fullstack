<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Admin\ApprovalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApprovalsController extends Controller
{
    public function __construct(private readonly ApprovalService $service)
    {
    }

    public function index(): JsonResponse
    {
        $pending = $this->service->listPending();

        return response()->json([
            'message' => 'Pending approvals loaded.',
            'data' => UserResource::collection($pending),
        ]);
    }

    public function approve(Request $request, User $user): JsonResponse
    {
        if ($user->role !== 'member') {
            return response()->json([
                'message' => 'Member not found.',
            ], 404);
        }
        $updated = $this->service->approve($user, $request->user());

        return response()->json([
            'message' => 'Member approved.',
            'user' => new UserResource($updated),
        ]);
    }

    public function reject(Request $request, User $user): JsonResponse
    {
        if ($user->role !== 'member') {
            return response()->json([
                'message' => 'Member not found.',
            ], 404);
        }
        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);
        $updated = $this->service->reject($user, $request->user(), $validated['reason'] ?? null);

        return response()->json([
            'message' => 'Member rejected.',
            'user' => new UserResource($updated),
        ]);
    }
}
