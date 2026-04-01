<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\UpdateAvatarRequest;
use App\Http\Requests\Member\UpdatePasswordRequest;
use App\Http\Requests\Member\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\Profile\MemberProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct(private readonly MemberProfileService $service)
    {
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Member profile loaded.',
            'user' => new UserResource($request->user()),
        ]);
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $this->service->updateProfile($request->user(), $request->validated());

        return response()->json([
            'message' => 'Member profile updated.',
            'user' => new UserResource($user),
        ]);
    }

    public function updateAvatar(UpdateAvatarRequest $request): JsonResponse
    {
        $path = $this->service->updateAvatar($request->user(), $request->file('avatar'));

        return response()->json([
            'message' => 'Avatar uploaded.',
            'avatar_url' => url(\Illuminate\Support\Facades\Storage::url($path)),
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        $ok = $this->service->updatePassword(
            $request->user(),
            $request->input('current_password'),
            $request->input('password')
        );

        if (!$ok) {
            return response()->json([
                'message' => 'Current password is incorrect.',
            ], 400);
        }

        return response()->json([
            'message' => 'Password updated.',
        ]);
    }
}
