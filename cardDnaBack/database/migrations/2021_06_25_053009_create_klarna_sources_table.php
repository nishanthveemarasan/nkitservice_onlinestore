<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKlarnaSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('klarna_sources', function (Blueprint $table) {
            $table->id();
            $table->string('source_id', 100);
            $table->string('order_id', 50);
            $table->json('payment_request');
            $table->json('config');
            $table->string('charge_id', 150)->nullable();
            $table->json('source_response')->nullable();
            $table->json('charge_response')->nullable();
            $table->enum('transaction_mode', ['test', 'live']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('klarna_sources');
    }
}
