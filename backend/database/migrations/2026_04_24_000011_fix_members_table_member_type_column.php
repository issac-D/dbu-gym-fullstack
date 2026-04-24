<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('members')) {
            return;
        }

        Schema::table('members', function (Blueprint $table) {
            if (!Schema::hasColumn('members', 'member_type')) {
                $table->string('member_type', 20)->nullable()->after('user_id');
            }
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('members')) {
            return;
        }

        if (Schema::hasColumn('members', 'member_type')) {
            Schema::table('members', function (Blueprint $table) {
                $table->dropColumn('member_type');
            });
        }
    }
};
