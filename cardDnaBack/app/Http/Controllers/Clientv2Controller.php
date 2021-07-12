<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ClientToken;
use App\Models\IPGConfig;
use App\Models\IPGprovider;
use Illuminate\Http\Request;
use App\Service\encryptionService;

class Clientv2Controller extends Controller
{
    public function verify(Request $request)
    {
        //$response = $request->all();
        $response = array(
            'host_name' => 'wordtest.oganro.com',
            'verify_token' => 'CTKxkgsJ9225LwSWGLkyegEXG4vBTM',
            'gateway_code' => 'klarna_xm97H8wUW'
        );
        $getVerifyToken = $response['verify_token'];
        $varifyToken = ClientToken::where('secret_key', $getVerifyToken)->exists();
        if (!$varifyToken) {
            $responseData = array(
                'result' => "failed",
            );
            return response()->json($responseData);
        } else {
            $getProvider = IPGConfig::where('provider_id', function ($query) use ($response) {
                $query->select('id')
                    ->from('ipgproviders')
                    ->where('provider_code', $response['gateway_code']);
            })
                ->where('host_name', $response['host_name'])->with('client', 'provider')
                ->whereNotNull('config_json')
                ->where('status', '1')->get()->toArray();
            if (count($getProvider) === 1) {
                $responseData = array(
                    'result' => "duplicate",
                );
                return response()->json($responseData);
            }
            $clientToken = ClientToken::where('secret_key', $getVerifyToken)->with('client')->get()->toArray();
            $clientId = $clientToken[0]['client_id'];
            $secretKeyId = $clientToken[0]['id'];
            $verifyStatus = $clientToken[0]['client']['verify_status'];
            $hostName = $response['host_name'];
            $gatewayCode = $response['gateway_code'];

            $getProvider = IPGprovider::where('provider_code', $gatewayCode)->get()->toArray();

            $getProvideId = $getProvider[0]['id'];

            if ($verifyStatus == '1') {
                //if already record is exits
                $getConfigExists = IPGConfig::where('client_id', $clientId)
                    ->where('provider_id', $getProvideId)
                    ->where('client_token_id', $secretKeyId)
                    ->where('host_name',  $hostName)
                    ->get()
                    ->toArray();
                if (count($getConfigExists) === 0) {
                    $insertArray = array(
                        'client_id' => $clientId,
                        'provider_id' => $getProvideId,
                        'client_token_id' => $secretKeyId,
                        'host_name' => $hostName,
                    );
                    $getInsertedId = IPGConfig::insertGetId($insertArray);
                    $id = encryptionService::encrypt($getInsertedId);
                    $returnArray = array(
                        'result' => "success",
                        'redirect_url' => url('api/latestClient/config/' . $id)
                    );

                    return response()->json($returnArray);
                } else {
                    $getStatus = $getConfigExists[0]['status'];

                    if ($getStatus == '0') {
                        $getConfigId = $getConfigExists[0]['id'];
                        $id = encryptionService::encrypt($getConfigId);
                        $updateConfig = IPGConfig::where('client_id', $clientId)
                            ->where('provider_id', $getProvideId)
                            ->where('client_token_id', $secretKeyId)
                            ->where('host_name',  $hostName)
                            ->update(['status' => '1']);
                        $returnArray = array(
                            'result' => "success",
                            'redirect_url' => url('api/latestClient/config/' . $id)
                        );
                        return response()->json($returnArray);
                    } elseif ($getStatus == '1') {
                        $getConfigId = $getConfigExists[0]['id'];
                        $id = encryptionService::encrypt($getConfigId);
                        $returnArray = array(
                            'result' => "success",
                            'redirect_url' => url('api/latestClient/config/' . $id)
                        );

                        return response()->json($returnArray);
                    }
                }
            } else {
                $insertArray = array(
                    'client_id' => $clientId,
                    'client_token_id' => $secretKeyId,
                    'provider_id' => $getProvideId,
                    'host_name' => $hostName,
                );
                $getInsertedId = IPGConfig::insertGetId($insertArray);
                $id = encryptionService::encrypt($getInsertedId);
                //update client as verified
                $updateCient = Client::where('id', $clientId)->update(['verify_status' => '1']);
                $returnArray = array(
                    'result' => "success",
                    'redirect_url' => url('api/latestClient/config/' . $id)
                );
                return response()->json($returnArray);
            }
        }
    }



    public function config($id)
    {
        $getId = (int)encryptionService::decrypt($id);
        // dd($getId);
        $getConfigData = IPGConfig::where('id', $getId)
            ->where('status', '1')
            ->with('client', 'provider')->get()->toArray();
        $configData = array(
            'config_id' => $getConfigData[0]['id'],
            'firt_name' => $getConfigData[0]['client']['first_name'],
            'last_name' => $getConfigData[0]['client']['last_name'],
            'provider' => $getConfigData[0]['provider']['name'],
            'hostname' => $getConfigData[0]['host_name'],
            'formData' => json_decode($getConfigData[0]['provider']['config_form'], true)
        );

        return view('wordpressClient.ipg_config')->with('data', $configData);
    }

    public function createConfig(Request $request)
    {
        $response = $request->all();
        array_splice($response, 0, 2);

        $configId = $response['config_id'];
        $hostName = $response['hostname'];
        unset($response['config_id']);
        unset($response['hostname']);

        $generateToken = $this->generateToken($response);
        $storeTokenInWordpress = $this->storeToken($generateToken, $hostName, 'test');
        if ($storeTokenInWordpress == '200') {
            $configData = json_encode($response);
            $updateConfigData = IPGConfig::where('id', $configId)
                ->where('status', '1')
                ->update(['config_json' => $configData, 'token' => $generateToken]);
            if ($updateConfigData) {
                $data = array('message' => "success");
                return view('wordpressClient.ipg_config')->with('data', $data);
            }
        } else {

            $data = array('message' => "failed");
            return view('wordpressClient.ipg_config')->with('data', $data);
        }
    }

    public function getConfigData(Request $request)
    {
        $response = $request->all();

        $getProvider = IPGConfig::where('provider_id', function ($query) use ($response) {
            $query->select('id')
                ->from('ipgproviders')
                ->where('provider_code', $response['gateway_code']);
        })
            ->where('host_name',  $response['host_name'])->with('client', 'provider')
            ->whereNotNull('config_json')
            ->where('status', '1')->get()->toArray();

        if (count($getProvider) === 0) {
            $returnArray = array(
                'result' => "failed",
            );

            return response()->json($returnArray);
        } elseif (count($getProvider) === 1) {
            $getId = $getProvider[0]['id'];
            $id = encryptionService::encrypt($getId);
            $returnArray = array(
                'result' => "success",
                'redirect_url' => url('api/latestClient/show-config-page/' . $id)
            );
            return response()->json($returnArray);
        }
    }

    public function showConfigPage($id)
    {
        $getId = (int)encryptionService::decrypt($id);
        $getConfigData = IPGConfig::where('id', $getId)
            ->where('status', '1')
            ->with('client', 'provider')->get()->toArray();
        $configData = array(
            'config_id' => $getConfigData[0]['id'],
            'firt_name' => $getConfigData[0]['client']['first_name'],
            'last_name' => $getConfigData[0]['client']['last_name'],
            'provider' => $getConfigData[0]['provider']['name'],
            'formData' => json_decode($getConfigData[0]['provider']['config_form'], true),
            'configTestData' => json_decode($getConfigData[0]['config_json'], true),
            'configLiveData' => isset($getConfigData[0]['live_config_json']) ? json_decode($getConfigData[0]['live_config_json'], true) : "",
            'testMode' => $getConfigData[0]['test_mode'] == 'test' ? 'test' : 'live',
        );
        //  dd($configData);
        return view('wordpressClient.ipg_config_data')->with('data', $configData);
    }

    public function updateConfig(Request $request)
    {
        $data = array();
        $response = $request->all();

        $configId = $response['config_id'];
        $config_data_test = array(
            'klarna_api_key' => $response['klarna_api_key_test'],
            'klarna_api_publishable_key' => $response['klarna_api_publishable_key_test'],
            'klarna_country_code' => $response['klarna_country_code_test'],
            'klarna_lang_code' => $response['klarna_lang_code_test'],
        );
        $config_data_live = array(
            'klarna_api_key' => $response['klarna_api_key_live'],
            'klarna_api_publishable_key' => $response['klarna_api_publishable_key_live'],
            'klarna_country_code' => $response['klarna_country_code_live'],
            'klarna_lang_code' => $response['klarna_lang_code_live'],
        );
        $configTestData = json_encode($config_data_test);
        $configLiveData = json_encode($config_data_live);

        if ($response['klarna_test_mode'] === 'test') {
            $updateConfigData = IPGConfig::where('id', $configId)
                ->where('status', '1')
                ->update([
                    'config_json' => $configTestData,
                    'test_mode' => 'test'
                ]);
            if ($updateConfigData) {
                $getConfig = IPGConfig::where('id', $configId)->get();
                $hostName = $getConfig[0]['host_name'];
                $updateTokenInWordpress = $this->storeToken('token', $hostName, 'test');
                $data = array(
                    'type' => "success",
                    'message' => 'Configuration has been updated successfully!!!'
                );
                return json_encode($data);
            }
        } elseif ($response['klarna_test_mode'] === 'live') {

            //check if the live data is exists and test mode is live
            $checkLiveConfigData = IPGConfig::where('id', $configId)
                ->where('status', '1')
                ->whereNotNull('live_config_json')
                ->where('live_verified', '1')
                ->exists();
            if ($checkLiveConfigData) {
                //alreay approved
                $updateConfigData = IPGConfig::where('id', $configId)
                    ->where('status', '1')
                    ->update([
                        'config_json' => $configTestData,
                        'live_config_json' => $configLiveData,
                        'test_mode' => 'live'
                    ]);
                if ($updateConfigData) {
                    $getConfig = IPGConfig::where('id', $configId)->get();
                    $hostName = $getConfig[0]['host_name'];
                    $updateTokenInWordpress = $this->storeToken('token', $hostName, 'live');
                    $data = array(
                        'type' => "success",
                        'message' => 'Configuration has been updated successfully!!!'
                    );
                    return json_encode($data);
                }
            } else {
                //not approved by admin
                $updateConfigData = IPGConfig::where('id', $configId)
                    ->where('status', '1')
                    ->update([
                        'config_json' => $configTestData,
                        'live_config_json' => $configLiveData,
                        'test_mode' => 'live'
                    ]);
                if ($updateConfigData) {
                    $data = array(
                        'type' => "success",
                        'message' => 'We have received your request for live transaction!!! we will get back to you ASAP. Thank you!!'
                    );
                    return json_encode($data);
                }
            }
        }
    }

    public function generateToken($configData)
    {
        $getArrayValues = implode("", array_values($configData));
        $writeTokenData = $getArrayValues . "webmotechoganro";
        $generateToken = md5($writeTokenData);
        return $generateToken;
    }

    public function storeToken($token, $hostName, $mode)
    {
        $generateToken = md5($token);
        $pageUrl = "https://" . $hostName . "/klarna-gateway-installation/";
        $ch = curl_init($pageUrl);
        $response = array(
            'token' => $generateToken,
            'host_name' => $hostName,
            'mode' => $mode,
        );
        // dd($pageUrl, $response);
        $str = json_encode($response);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $str);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 300);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            [
                'Content-Type: application/json',
            ]
        );
        $response = curl_exec($ch);
        $info = curl_getinfo($ch);
        return $info['http_code'];
    }



    public function removeConfig(Request $request)
    {
        $gatewayCode = $request['gateway_code'];
        $hostname = $request['host_name'];
        $getProvider = IPGprovider::where('provider_code', $gatewayCode)->get()->toArray();
        $getProvideId = $getProvider[0]['id'];
        $updateConfigData = IPGConfig::where('provider_id', $getProvideId)
            ->where('host_name', $hostname)
            ->where('status', '1')
            ->update([
                'status' => '0',
                'config_json' => NULL,
                'live_config_json' => NULL,
                'test_mode' => 'test',
                'token' => NULL
            ]);

        return response()->json(array('msg' => 'success'), 200);
    }

    public function updateLiveToken()
    {
        $checkLiveConfigData = IPGConfig::where('id', 48)
            ->where('status', '1')
            ->whereNotNull('live_config_json')
            ->where('test_mode', 'live')
            ->get()
            ->toArray();
        if (count($checkLiveConfigData) === 1) {
            $hostName = $checkLiveConfigData[0]['host_name'];

            $updateTokenInWordpress = $this->storeToken('token', $hostName, 'live');
            dd($updateTokenInWordpress);
        }
        // if ($checkLiveConfigData) {
        //     $updateTokenInWordpress = $this->storeToken($generateToken, $hostName, 'test');
        // }
    }
}
