<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')
            ->scopes(['openid', 'profile', 'email'])
            ->redirect();
    }

    public function callback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable) {
            return redirect()->away($this->frontendUrl('/login', [
                'oauth_error' => 'google_callback_failed',
            ]));
        }

        $email = strtolower(trim((string) $googleUser->getEmail()));
        if ($email === '') {
            return redirect()->away($this->frontendUrl('/login', [
                'oauth_error' => 'google_email_missing',
            ]));
        }

        $user = User::query()->where('email', $email)->first();
        if (!$user) {
            return redirect()->away($this->frontendUrl('/login', [
                'oauth_error' => 'account_not_found',
            ]));
        }

        Auth::guard('web')->login($user);
        $request->session()->regenerate();

        if ($user->role === 'admin') {
            return redirect()->away($this->frontendUrl('/admin/dashboard'));
        }

        if (strtolower((string) $user->account_status) === 'pendingapproval') {
            return redirect()->away($this->frontendUrl('/pending-approval'));
        }

        return redirect()->away($this->frontendUrl('/members/dashboard'));
    }

    private function frontendUrl(string $path, array $query = []): string
    {
        $base = rtrim((string) env('FRONTEND_URL', 'http://localhost:5173'), '/');
        $url = $base . '/' . ltrim($path, '/');

        if ($query === []) {
            return $url;
        }

        return $url . '?' . http_build_query($query);
    }
}

