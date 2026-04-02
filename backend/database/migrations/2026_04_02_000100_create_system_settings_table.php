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
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->string('system_name')->default('DBU Gym System');
            $table->string('language', 10)->default('en');
            $table->string('timezone', 20)->default('UTC+3');
            $table->boolean('maintenance_mode')->default(false);
            $table->boolean('two_fa')->default(true);
            $table->unsignedTinyInteger('password_min_length')->default(8);
            $table->unsignedSmallInteger('password_expiry_days')->default(90);
            $table->boolean('password_special_chars')->default(true);
            $table->unsignedSmallInteger('session_timeout')->default(30);
            $table->unsignedSmallInteger('max_login_attempts')->default(3);
            $table->boolean('email_notifications')->default(true);
            $table->boolean('sms_notifications')->default(false);
            $table->string('sender_email')->default('support@dbugym.com');
            $table->string('api_key')->nullable();
            $table->boolean('auto_backup')->default(true);
            $table->string('backup_frequency', 20)->default('weekly');
            $table->string('theme', 20)->default('dark');
            $table->string('accent_color', 20)->default('#51CCF9');
            $table->string('layout_style', 20)->default('comfortable');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_settings');
    }
};
