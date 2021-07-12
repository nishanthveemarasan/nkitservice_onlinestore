<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHostnameColumnToKlarnaSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('klarna_sources', function (Blueprint $table) {
            $table->string('host_name', 100)->after('config');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('klarna_sources', function (Blueprint $table) {
            $table->dropColumn('host_name');
        });
    }
}
