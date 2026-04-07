<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
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
}
