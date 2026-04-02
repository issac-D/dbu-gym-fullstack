<?php

namespace App\Services\Admin;

use App\Models\SystemSetting;
use App\Models\User;

class SystemSettingsService
{
    public function get(): SystemSetting
    {
        return SystemSetting::query()->firstOrCreate([], []);
    }

    public function update(SystemSetting $settings, array $data, User $admin): SystemSetting
    {
        $settings->fill($data);
        $settings->updated_by = $admin->id;
        $settings->save();

        return $settings->refresh();
    }
}
