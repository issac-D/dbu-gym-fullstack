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
            $table->string('membership_status', 30)->nullable()->after('membership_plan');
            $table->string('payment_status', 30)->nullable()->after('membership_status');
            $table->timestamp('plan_start_at')->nullable()->after('payment_status');
            $table->timestamp('plan_expires_at')->nullable()->after('plan_start_at');
            $table->integer('plan_cost')->nullable()->after('plan_expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'membership_status',
                'payment_status',
                'plan_start_at',
                'plan_expires_at',
                'plan_cost',
            ]);
        });
    }
};
