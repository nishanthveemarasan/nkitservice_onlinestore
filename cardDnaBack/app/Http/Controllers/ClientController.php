<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\IPGConfig;
use App\Models\IPGprovider;
use Illuminate\Http\Request;
use App\Service\encryptionService;

class ClientController extends Controller
{
    public function verify(Request $request)
    {
        $response = $request->all();
        $getVerifyToken = $response['verify_token'];
        $varifyToken = Client::where('secret_key', $getVerifyToken)->exists();
        if (!$varifyToken) {
            $responseData = array(
                'redirectUrl' => $response['return_url'],
                'result' => "failed",

            );
            return response()->json($responseData);
        } else {
            $getProvider = IPGConfig::where('provider_id', function ($query) use ($response) {
                $query->select('id')
                    ->from('ipgproviders')
                    ->where('provider_code', $response['gateway_code']);
            })
                ->where('host_name', 'like', $response['host_name'] . '%')->with('client', 'provider')
                ->whereNotNull('config_json')
                ->where('status', '1')->get()->toArray();

            if (count($getProvider) === 1) {
                $responseData = array(
                    'result' => "duplicate",
                );

                return response()->json($responseData);
            }

            $getClientId = Client::where('secret_key', $getVerifyToken)->get()->toArray();
            $clientId = $getClientId[0]['id'];
            $verifyStatus = $getClientId[0]['verify_status'];
            $hostName = $response['host_name'];
            $gatewayCode = $response['gateway_code'];

            $getProvider = IPGprovider::where('provider_code', $gatewayCode)->get()->toArray();
            $getProvideId = $getProvider[0]['id'];
            if ($verifyStatus == '1') {
                //if already record is exits
                $getConfigExists = IPGConfig::where('client_id', $clientId)
                    ->where('provider_id', $getProvideId)
                    ->get()
                    ->where('status', '0')
                    ->toArray();
                if (count($getConfigExists) === 1) {
                    $getConfigId = $getConfigExists[0]['id'];
                    $id = encryptionService::encrypt($getConfigId);
                    $updateConfig = IPGConfig::where('client_id', $clientId)
                        ->where('provider_id', $getProvideId)
                        ->update(['status' => '1']);
                    $returnArray = array(
                        'result' => "success",
                        'redirect_url' => url('api/client/config/' . $id)
                    );
                    return response()->json($returnArray);
                } else {

                    $getConfig = IPGConfig::where('client_id', $clientId)
                        ->where('provider_id', $getProvideId)
                        ->get()
                        ->where('status', '1')
                        ->toArray();

                    if (count($getConfig) === 0) {
                        $insertArray = array(
                            'client_id' => $clientId,
                            'provider_id' => $getProvideId,
                            'host_name' => $hostName,
                        );
                        $getInsertedId = IPGConfig::insertGetId($insertArray);
                        $id = encryptionService::encrypt($getInsertedId);
                        //update client as verified
                        $updateCient = Client::where('id', $clientId)->update(['verify_status' => '1']);
                        $returnArray = array(
                            'result' => "success",
                            'redirect_url' => url('api/client/config/' . $id)
                        );
                        return response()->json($returnArray);
                    } else {
                        $getConfigId = $getConfig[0]['id'];
                        $id = encryptionService::encrypt($getConfigId);
                        $returnArray = array(
                            'result' => "success",
                            'redirect_url' => url('api/client/config/' . $id)
                        );
                        return response()->json($returnArray);
                    }
                }
            } else {
                $insertArray = array(
                    'client_id' => $clientId,
                    'provider_id' => $getProvideId,
                    'host_name' => $hostName,
                );
                $getInsertedId = IPGConfig::insertGetId($insertArray);
                $id = encryptionService::encrypt($getInsertedId);
                //update client as verified
                $updateCient = Client::where('id', $clientId)->update(['verify_status' => '1']);
                $returnArray = array(
                    'result' => "success",
                    'redirect_url' => url('api/client/config/' . $id)
                );
                return response()->json($returnArray);
            }
            //create basic config details




        }
    }

    public function verifyTest(Request $request)
    {
        $response = array(
            'verify_token' => 'dTrGbbXCBw3gGLev',
            'return_url' => 'it not working',
            'gateway_code' => 'klarna_xm97H8wUW',
            'host_name' => 'wordtest.oganro.com'
        );
        $getVerifyToken = $response['verify_token'];
        $varifyToken = Client::where('secret_key', $getVerifyToken)->exists();
        if (!$varifyToken) {
            $responseData = array(
                'redirectUrl' => $response['return_url'],
                'result' => "failed",

            );
            return response()->json($responseData);
        } else {
            $getProvider = IPGConfig::where('provider_id', function ($query) use ($response) {
                $query->select('id')
                    ->from('ipgproviders')
                    ->where('provider_code', $response['gateway_code']);
            })
                ->where('host_name', 'like', $response['host_name'] . '%')->with('client', 'provider')
                ->whereNotNull('config_json')
                ->where('status', '1')->get()->toArray();

            if (count($getProvider) === 1) {
                $responseData = array(
                    'result' => "duplicate",
                );

                return response()->json($responseData);
            }

            $getClientId = Client::where('secret_key', $getVerifyToken)->get()->toArray();
            $clientId = $getClientId[0]['id'];
            $verifyStatus = $getClientId[0]['verify_status'];
            $hostName = $response['host_name'];
            $gatewayCode = $response['gateway_code'];
            $getProvider = IPGprovider::where('provider_code', $gatewayCode)->get()->toArray();
            $getProvideId = $getProvider[0]['id'];
            if ($verifyStatus == '1') {
                //if already record is exits
                $getConfigExists = IPGConfig::where('client_id', $clientId)
                    ->where('provider_id', $getProvideId)
                    ->where('status', '0')
                    ->get()
                    ->toArray();

                if (count($getConfigExists) === 1) {

                    $getConfigId = $getConfigExists[0]['id'];
                    $id = encryptionService::encrypt($getConfigId);
                    $updateConfig = IPGConfig::where('client_id', $clientId)
                        ->where('provider_id', $getProvideId)
                        ->update(['status' => '1']);
                    $returnArray = array(
                        'result' => "success",
                        'redirect_url' => url('api/client/config/' . $id)
                    );
                    return response()->json($returnArray);
                } else {

                    $getConfig = IPGConfig::where('client_id', $clientId)
                        ->where('provider_id', $getProvideId)
                        ->get()
                        ->where('status', '1')
                        ->toArray();

                    if (count($getConfig) === 0) {
                        $insertArray = array(
                            'client_id' => $clientId,
                            'provider_id' => $getProvideId,
                            'host_name' => $hostName,
                        );
                        $getInsertedId = IPGConfig::insertGetId($insertArray);
                        $id = encryptionService::encrypt($getInsertedId);
                        //update client as verified
                        $updateCient = Client::where('id', $clientId)->update(['verify_status' => '1']);
                        $returnArray = array(
                            'result' => "success",
                            'redirect_url' => url('api/client/config/' . $id)
                        );
                        return response()->json($returnArray);
                    } else {
                        $getConfigId = $getConfig[0]['id'];
                        $id = encryptionService::encrypt($getConfigId);
                        $returnArray = array(
                            'result' => "success",
                            'redirect_url' => url('api/client/config/' . $id)
                        );
                        return response()->json($returnArray);
                    }
                }
            } else {
                $insertArray = array(
                    'client_id' => $clientId,
                    'provider_id' => $getProvideId,
                    'host_name' => $hostName,
                );
                $getInsertedId = IPGConfig::insertGetId($insertArray);
                $id = encryptionService::encrypt($getInsertedId);
                //update client as verified
                $updateCient = Client::where('id', $clientId)->update(['verify_status' => '1']);
                $returnArray = array(
                    'result' => "success",
                    'redirect_url' => url('api/client/config/' . $id)
                );
                return response()->json($returnArray);
            }
            //create basic config details




        }
    }

    public function config($id)
    {
        $getId = (int)encryptionService::decrypt($id);
        // dd($getId);
        $getConfigData = IPGConfig::where('id', $getId)
            ->where('status', '1')
            ->with('client', 'provider')->get()->toArray();
        //  dd($getConfigData);
        $configData = array(
            'config_id' => $getConfigData[0]['id'],
            'firt_name' => $getConfigData[0]['client']['first_name'],
            'last_name' => $getConfigData[0]['client']['last_name'],
            'provider' => $getConfigData[0]['provider']['name'],
            'hostname' => $getConfigData[0]['host_name'],
            'formData' => json_decode($getConfigData[0]['provider']['config_form'], true)
        );
        // dd($configData);
        return view('wordpress.ipg_config')->with('data', $configData);
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
        $storeTokenInWordpress = $this->storeToken($generateToken, $hostName);
        if ($storeTokenInWordpress == '200') {
            $configData = json_encode($response);
            $updateConfigData = IPGConfig::where('id', $configId)
                ->where('status', '1')
                ->update(['config_json' => $configData, 'token' => $generateToken]);
            if ($updateConfigData) {
                $data = array('message' => "success");
                return view('wordpress.ipg_config')->with('data', $data);
            }
        } else {

            $data = array('message' => "failed");
            return view('wordpress.ipg_config')->with('data', $data);
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
            ->where('host_name', 'like',  $response['host_name'] . '%')->with('client', 'provider')
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
                'redirect_url' => url('api/client/show-config-page/' . $id)
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
            'configData' => json_decode($getConfigData[0]['config_json'], true),
        );
        return view('wordpress.ipg_config_data')->with('data', $configData);
    }

    public function updateConfig(Request $request)
    {
        $data = array();
        $response = $request->all();
        $configId = $response['config_id'];
        if ($response['klarna_test_mode'] === 'test') {
            $config_data_test = array(
                'klarna_api_key' => $response['klarna_api_key_test'],
                'klarna_api_publishable_key' => $response['klarna_api_publishable_key_test'],
                'klarna_country_code' => $response['klarna_country_code_test'],
                'klarna_lang_code' => $response['klarna_lang_code_test'],
            );
            $configData = json_encode($config_data_test);
            $updateConfigData = IPGConfig::where('id', $configId)
                ->where('status', '1')
                ->update(['config_json' => $configData]);
            if ($updateConfigData) {
                $data = array('message' => "success");
            }
            return json_encode($data);
        } else {
        }
    }

    public function generateToken($configData)
    {
        $getArrayValues = implode("", array_values($configData));
        $writeTokenData = $getArrayValues . "webmotechoganro";
        $generateToken = md5($writeTokenData);
        return $generateToken;
    }

    public function storeToken($token, $hostName)
    {
        $generateToken = md5($token);
        $pageUrl = "https://" . $hostName . "/klarna-gateway-installation/";
        $ch = curl_init($pageUrl);
        $response = array(
            'token' => $generateToken
        );
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
            ->where('host_name', 'like', $hostname . '%')
            ->where('status', '1')
            ->update(['status' => '0']);

        return response()->json(array('msg' => 'success'), 200);
    }
}


//client/config/eyJpdiI6IjQ1MUF1ZUg3R0lkVEFpZlc0T0x6YlE9PSIsInZhbHVlIjoiem1zMVh0bEh5bS9pYWpLUWxrR3VPUT09IiwibWFjIjoiMzBjOGE3YjIxODE2ZTdkY2NhOWM2ZDBhMmFlYTVmZmRmZjljN2VhNzk3OGY5Yzk4NWNhYzQ5ZTgxMjUyOTBmMCJ9