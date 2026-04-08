<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $adminUsers = DB::table('users')
            ->where('role', 'admin')
            ->get(['id']);

        foreach ($adminUsers as $admin) {
            $exists = DB::table('admins')->where('user_id', $admin->id)->exists();
            if ($exists) {
                continue;
            }
            DB::table('admins')->insert([
                'user_id' => $admin->id,
                'admin_role' => 'System Admin',
                'permissions_set' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('admins')->truncate();
    }
};
