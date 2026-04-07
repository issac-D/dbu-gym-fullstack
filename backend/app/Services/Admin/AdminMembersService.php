<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class AdminMembersService
{
    public function list(): Collection
    {
        return User::query()
            ->where('role', 'member')
            ->latest('created_at')
            ->get();
    }
}
