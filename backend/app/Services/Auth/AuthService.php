<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): User
    {
        $memberId = $this->generateMemberId($data['member_type'] ?? null);

        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'member',
            'phone' => $data['phone'] ?? null,
            'gender' => $data['gender'] ?? null,
            'member_type' => $data['member_type'] ?? null,
            'membership_type' => $data['membership_type'] ?? null,
            'membership_plan' => $data['membership_plan'] ?? null,
            'university_id' => $data['university_id'] ?? null,
            'department' => $data['department'] ?? null,
            'national_id' => $data['national_id'] ?? null,
            'address' => $data['address'] ?? null,
            'member_id' => $memberId,
            'terms_accepted_at' => now(),
        ]);

        Auth::login($user);

        return $user;
    }

    private function generateMemberId(?string $memberType): string
    {
        do {
            $prefix = $memberType === 'external' ? 'EXT' : 'DBU';
            $year = date('Y');
            $sequence = str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT);
            $candidate = $prefix . '-' . $year . '-' . $sequence;
        } while (User::query()->where('member_id', $candidate)->exists());

        return $candidate;
    }

    public function attemptLogin(Request $request, array $credentials): bool
    {
        return Auth::attempt($credentials, $request->boolean('remember'));
    }

    public function logout(Request $request): void
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
