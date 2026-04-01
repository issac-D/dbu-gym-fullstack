<?php

namespace App\Services\Profile;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;

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
        $path = $file->store('avatars', 'public');

        $user->update([
            'avatar_path' => $path,
        ]);

        return $path;
    }
}
