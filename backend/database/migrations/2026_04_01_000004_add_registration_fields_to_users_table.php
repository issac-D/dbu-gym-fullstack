<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('member_type', 20)->nullable()->after('role');
            $table->string('gender', 20)->nullable()->after('member_type');
            $table->string('national_id', 100)->nullable()->after('department');
            $table->string('address', 255)->nullable()->after('national_id');
            $table->string('membership_plan', 50)->nullable()->after('membership_type');
            $table->timestamp('terms_accepted_at')->nullable()->after('address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['member_type', 'gender', 'national_id', 'address', 'membership_plan', 'terms_accepted_at']);
        });
    }
};
