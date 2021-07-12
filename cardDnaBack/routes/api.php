<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\Clientv2Controller;
use App\Http\Controllers\IPGproviderController;
use App\Http\Controllers\KlarnaController;
use App\Http\Controllers\Klarnav2Controller;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('stripe')->group(function () {
    Route::get('sandbox/index', [StripePaymentController::class, 'index']);
    Route::post('create', [StripePaymentController::class, 'create']);
    Route::post('index', [StripePaymentController::class, 'index']);
    Route::post('response', [StripePaymentController::class, 'response']);
});
Route::get('client/validation', function () {
    return view('wordpress.ipg_config');
})->name('validationError');
Route::get('test', [TestController::class, 'callback']);
Route::get('test1', [Clientv2Controller::class, 'testVerify']);

//new version
Route::prefix('client')->group(function () {
    Route::get('verify', [Clientv2Controller::class, 'verify']);
    Route::get('config/{id}', [Clientv2Controller::class, 'config']);
    Route::get('show-errors', [Clientv2Controller::class, 'showIPGconfigPage'])->name('ipgdata');
    Route::post('create-config', [Clientv2Controller::class, 'createConfig']);
    Route::post('update-config', [Clientv2Controller::class, 'updateConfig']);
    Route::post('get-config-data', [Clientv2Controller::class, 'getConfigData']);
    Route::get('show-config-page/{id}', [Clientv2Controller::class, 'showConfigPage']);
    Route::get('generate-token/{id}', [Clientv2Controller::class, 'token']);
    Route::post('delete-config', [Clientv2Controller::class, 'removeConfig']);
    Route::get('update-live-token', [Clientv2Controller::class, 'updateLiveToken']);
});

Route::prefix('provider')->group(function () {
    Route::get('get', [IPGproviderController::class, 'get']);
});

Route::prefix('klarnaVtwo')->group(function () {
    Route::get('sandbox/index', [Klarnav2Controller::class, 'testindex']);
    Route::post('index', [Klarnav2Controller::class, 'index']);
    Route::get('response', [Klarnav2Controller::class, 'response']);
    Route::post('charge-response', [Klarnav2Controller::class, 'callback']);
});
