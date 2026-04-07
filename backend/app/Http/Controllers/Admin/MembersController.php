<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMemberRequest;
use App\Http\Requests\Admin\UpdateMemberRequest;
use App\Http\Requests\Admin\UpdateMemberStatusRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Admin\AdminMembersService;
use Illuminate\Http\JsonResponse;

class MembersController extends Controller
{
    public function __construct(private readonly AdminMembersService $service)
    {
    }

    public function index(): JsonResponse
    {
        $members = $this->service->list();

        return response()->json([
            'message' => 'Members loaded.',
            'data' => UserResource::collection($members),
        ]);
    }

    public function store(StoreMemberRequest $request): JsonResponse
    {
        $member = $this->service->create($request->validated(), $request->user());

        return response()->json([
            'message' => 'Member created.',
            'user' => new UserResource($member),
        ], 201);
    }

    public function update(UpdateMemberRequest $request, User $user): JsonResponse
    {
        if ($user->role !== 'member') {
            return response()->json([
                'message' => 'Member not found.',
            ], 404);
        }

        $updated = $this->service->update($user, $request->validated());

        return response()->json([
            'message' => 'Member updated.',
            'user' => new UserResource($updated),
        ]);
    }

    public function setStatus(User $user, UpdateMemberStatusRequest $request): JsonResponse
    {
        if ($user->role !== 'member') {
            return response()->json([
                'message' => 'Member not found.',
            ], 404);
        }

        $status = $request->validated()['account_status'];

        $updated = $this->service->setAccountStatus($user, $status);

        return response()->json([
            'message' => 'Member status updated.',
            'user' => new UserResource($updated),
        ]);
    }
}
