<?php

namespace App\Services\Profile;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AdminProfileService
{
    public function updateProfile(User $user, array $data): User
    {
        $user->update([
            'name' => $data['name'],
            'username' => $data['username'] ?? $user->username,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
        ]);

        if ($user->role === 'admin') {
            Admin::query()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'admin_role' => $data['admin_role'] ?? 'System Admin',
                    'permissions_set' => $data['permissions_set'] ?? null,
                ]
            );
        }

        return $user->refresh();
    }

    public function updatePassword(User $user, string $currentPassword, string $newPassword): bool
    {
        if (!Hash::check($currentPassword, $user->password)) {
            return false;
        }

        $user->update([
            'password' => $newPassword,
        ]);

        return true;
    }

    public function updateAvatar(User $user, UploadedFile $file): string
    {
        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = $file->store('avatars', 'public');

        $user->update([
            'avatar_path' => $path,
        ]);

        return $path;
    }
}
