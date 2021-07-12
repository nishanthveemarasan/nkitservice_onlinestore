<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIPGConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ipg_configs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('provider_id');
            $table->json('config_json')->nullable();
            $table->json('live_config_json')->nullable();
            $table->enum('test_mode', ['test', 'live'])->default('test');
            $table->text('token')->nullable();
            $table->string('host_name', 100);
            $table->enum('status', [1, 0])->default(1);
            $table->enum('live_verified', [1, 0])->default(0);
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('provider_id')->references('id')->on('ipgproviders')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('i_p_g_configs');
    }
}
