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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Who's ordering
            $table->string('customer_name');
            $table->string('facebook_link')->nullable();
            $table->string('contact_number')->nullable();

            // What they're ordering — kept simple (no separate "services" table
            // for now, since the menu is small and mostly static). If the menu
            // grows or needs admin-side editing later, this is the natural
            // place to split into a proper services table + foreign key.
            $table->enum('segment', ['elementary', 'junior_high', 'senior_high', 'college'])->index();
            $table->string('service'); // e.g. "PowerPoint Decks", "Lesson Plans (ILAW)"
            $table->string('subject')->nullable();
            $table->string('coverage')->nullable(); // e.g. "Week 3", "Quarter 2"
            $table->text('notes')->nullable();

            // Order lifecycle
            $table->enum('status', ['pending', 'confirmed', 'in_progress', 'delivered', 'cancelled'])
                ->default('pending')
                ->index();
            $table->decimal('quoted_price', 8, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
