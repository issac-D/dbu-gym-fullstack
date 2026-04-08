<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('users')->whereNull('phone')->update(['phone' => '']);
        DB::table('users')->whereNull('account_status')->update(['account_status' => 'PendingApproval']);

        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 30)->default('')->nullable(false)->change();
            $table->string('account_status', 20)->default('PendingApproval')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 30)->nullable()->change();
            $table->string('account_status', 20)->default('active')->change();
        });
    }
};
