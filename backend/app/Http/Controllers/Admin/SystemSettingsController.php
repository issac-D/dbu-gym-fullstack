<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSystemSettingsRequest;
use App\Services\Admin\SystemSettingsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class SystemSettingsController extends Controller
{
    public function __construct(private readonly SystemSettingsService $service)
    {
    }

    public function show(): JsonResponse
    {
        $settings = $this->service->get();
        $logoUrl = $settings->logo_path ? url(Storage::url($settings->logo_path)) : null;

        return response()->json([
            'message' => 'Settings loaded.',
            'settings' => array_merge($settings->toArray(), [
                'logo_url' => $logoUrl,
            ]),
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

    public function updateLogo(UpdateSystemSettingsRequest $request): JsonResponse
    {
        $settings = $this->service->get();
        $request->validate([
            'logo' => ['required', 'image', 'max:2048'],
        ]);

        if ($settings->logo_path && Storage::disk('public')->exists($settings->logo_path)) {
            Storage::disk('public')->delete($settings->logo_path);
        }

        $path = $request->file('logo')->store('system', 'public');
        $settings->update([
            'logo_path' => $path,
            'updated_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Logo updated.',
            'logo_url' => url(Storage::url($path)),
        ]);
    }
}
