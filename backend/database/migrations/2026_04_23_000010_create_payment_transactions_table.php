<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('tx_ref')->unique();
            $table->string('gateway', 30)->default('chapa');
            $table->string('status', 30)->default('pending');
            $table->unsignedInteger('amount')->nullable();
            $table->string('currency', 10)->default('ETB');
            $table->string('email')->nullable();
            $table->text('checkout_url')->nullable();
            $table->json('registration_payload')->nullable();
            $table->json('gateway_response')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->string('failure_reason')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['status', 'gateway']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_transactions');
    }
};
