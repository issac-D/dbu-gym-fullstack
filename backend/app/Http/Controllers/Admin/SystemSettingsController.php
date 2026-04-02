<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSystemSettingsRequest;
use App\Services\Admin\SystemSettingsService;
use Illuminate\Http\JsonResponse;

class SystemSettingsController extends Controller
{
    public function __construct(private readonly SystemSettingsService $service)
    {
    }

    public function show(): JsonResponse
    {
        $settings = $this->service->get();

        return response()->json([
            'message' => 'Settings loaded.',
            'settings' => $settings,
        ]);
    }

    public function update(UpdateSystemSettingsRequest $request): JsonResponse
    {
        $settings = $this->service->get();
        $updated = $this->service->update($settings, $request->validated(), $request->user());

        return response()->json([
            'message' => 'Settings updated.',
            'settings' => $updated,
        ]);
    }
}
