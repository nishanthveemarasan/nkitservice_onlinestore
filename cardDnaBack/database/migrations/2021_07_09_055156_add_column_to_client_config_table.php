<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToClientConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ipg_configs', function (Blueprint $table) {
            $table->unsignedBigInteger('client_token_id')->after('provider_id');
            $table->foreign('client_token_id')->references('id')->on('client_token')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ipg_configs', function (Blueprint $table) {
            $table->dropColumn('client_token_id');
        });
    }
}
