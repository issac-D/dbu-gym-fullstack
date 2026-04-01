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
            $table->string('member_id', 50)->nullable()->after('role');
            $table->string('membership_type', 50)->nullable()->after('member_id');
            $table->string('university_id', 50)->nullable()->after('membership_type');
            $table->string('department', 100)->nullable()->after('university_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['member_id', 'membership_type', 'university_id', 'department']);
        });
    }
};
