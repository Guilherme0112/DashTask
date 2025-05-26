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
        Schema::table('column_for_topics', function (Blueprint $table) {
            $table->date('dateOfFleet')->nullable();
            $table->unsignedInteger('startKM')->nullable();
            $table->unsignedInteger('endKM')->nullable();
            $table->decimal('valueForKM', 8, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('column_for_topics', function (Blueprint $table) {
            $table->dropColumn(['dateOfFleet', 'startKM', 'aendKM', 'valueForKM']);
        });
    }
};
