<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\IPGConfig;
use App\Models\KlarnaSource;
use App\Service\encryptionService;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test($token = "sdasdasdasdasdasdasascdasdasd")
    {


        $getClient = Client::get()->toArray();
        dd($getClient);
        $generateToken = md5($token);
        $pageUrl = "http://wordpress.test/klarna-gateway-installation/";
        // return redirect($pageUrl);
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
        dd($response);
        return $info['http_code'];
    }

    public function createConfig()
    {
        $response = array(
            "_token" => null,
            "_method" => "post",
            "config_id" => "29",
            "hostname" => "wordpress.webmotech.com",
            "klarna_api_key" => "sk_test_51IxPnGIAwOQfiTQKb4sbfEJrR4UQbySvVAJreZk5GBGOVoRzb50ebmQ726aj9UolNh151bshu0RTcQH3xaAUmdRm00qFeBpCBo",
            "klarna_api_publishable_key" => "pk_test_51IxPnGIAwOQfiTQKOFqCtR3QILxt5xnoLUQaQ26mIuAvATN1021zAZgYU6miQXKTwofiaen0yF4RVYh9Z7vH7gpq008Vxx6brd",
            "klarna_country_code" => "DE",
            "klarna_lang_code" => "de-de"
        );
        array_splice($response, 0, 2);

        $configId = $response['config_id'];
        $hostName = $response['hostname'];
        unset($response['config_id']);
        unset($response['hostname']);

        $generateToken = $this->generateToken($response);
        //  dd($generateToken);
        $storeTokenInWordpress = $this->storeToken($generateToken, $hostName);
        if ($storeTokenInWordpress == '200') {
            $configData = json_encode($response);
            $updateConfigData = IPGConfig::where('id', $configId)
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

    public function callback()
    {
        //  $decrypt = 'eyJpdiI6IjQ1MUF1ZUg3R0lkVEFpZlc0T0x6YlE9PSIsInZhbHVlIjoiem1zMVh0bEh5bS9pYWpLUWxrR3VPUT09IiwibWFjIjoiMzBjOGE3YjIxODE2ZTdkY2NhOWM2ZDBhMmFlYTVmZmRmZjljN2VhNzk3OGY5Yzk4NWNhYzQ5ZTgxMjUyOTBmMCJ9';
        $getString = encryptionService::encrypt(48);
        dd($getString);
        //  $decrypt = (int)encryptionService::decrypt($decrypt);
        //  dd($decrypt);
        $getProvider = IPGConfig::where('provider_id', function ($query) {
            $query->select('id')
                ->from('ipgproviders')
                ->where('provider_code', "klarna_xm97H8wUW");
        })
            ->where('host_name', "wordpress.webmotech.com")->with('client', 'provider')
            ->whereNotNull('config_json')
            ->where('status', '1')->get()->toArray();
        dd(count($getProvider));
    }

    public function curlResponse($data, $hostname)
    {
        $pageUrl = "https://" . $hostname . "/klarna-callback-response/";
        $ch = curl_init($pageUrl);
        $str = json_encode($data);
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

        dd($info);
    }
}
