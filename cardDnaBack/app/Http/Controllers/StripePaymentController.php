<?php

namespace App\Http\Controllers;

use App\Models\IPGConfig;
use App\Models\StripePayment;
use Illuminate\Http\Request;
use Throwable;

class StripePaymentController extends Controller
{
    public function index()
    {
        $payment_request = [
            "token" => md5("ebf5418080d8a9ff3d4187a38e52bdf6"),
            "hostName" => "wordpress.webmotech.com",
            "orderId" => "127",
            "gatewayToken" => "klarna_xm97H8wUW",
            "amount" => 12.34 * 100,
            "currency" => "EUR",
            "first_name" => "Nishanth",
            "last_name" => "veemararan",
            "email" => "iamnishanthvee@gmail.com",
            "city" => "Howthorn East",
            "country" => "Australia",
            "line1" => "130 rathmines rd",
            "postal_code" => "3123",
        ];
        $verifyToken = $this->verifyToken($payment_request);


        $stripe = new StripePayment;
        $stripe->order_id = $payment_request['orderId'];
        $stripe->pay_request = json_encode($payment_request);
        $stripe->config = json_encode($verifyToken['data']['config_json']);
        $stripe->amount = ($payment_request['amount'] / 100);
        $stripe->hostname = $payment_request['hostName'];
        $stripe->save();
        $config = json_decode($verifyToken['data']['config_json'], true);
        $data = [
            'config' => $config,
            'payment' => $payment_request,
            'return_url' => url('api/stripe/response') . '?key=' . $payment_request['orderId'],
        ];

        return view('admin.stripe.checkout', $data);
    }
    public function verifyToken($data)
    {
        //->with('client', 'provider')
        $getProvider = IPGConfig::where('provider_id', function ($query) use ($data) {
            $query->select('id')
                ->from('ipgproviders')
                ->where('provider_code', $data['gatewayToken']);
        })
            ->where('host_name', $data['hostName'])
            ->whereNotNull('config_json')->where('status', '1')->get()->toArray();
        if (count($getProvider) === 0) {
            $returnArray = array(
                'result' => "failed",
            );
        } elseif (count($getProvider) === 1) {
            $getToken = $getProvider[0]['token'];
            $verifyToken = md5($getToken) === $data['token'] ? true : false;
            if ($verifyToken) {
                return array('status' => 'success', 'data' => $getProvider[0]);
            } else {
                return array('status' => 'failed', 'data' => array());
            }
        }
    }
    public function createPaymentIntent($payment_request)
    {
        $url = 'https://api.stripe.com/v1/payment_intents';

        $payload = [
            'amount' => $payment_request['amount'],
            'currency' => $payment_request['currency'],
        ];
        // Prepare new cURL resource
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));

        // Set HTTP Header for POST request
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/x-www-form-urlencoded",
            'Authorization: Bearer ' . $payment_request['key']
        ));

        // Submit the POST request
        $result = curl_exec($ch);
        $info = curl_getinfo($ch);

        if ($info['http_code'] == 200) {
            StripePayment::where('order_id',  $payment_request['orderId'])
                ->update(
                    ['payment_intent' => json_encode($result)]
                );
            return ['status' => true, 'data' => json_decode($result, true)];
        } else {
            return ['status' => false, 'data' => []];
        }




        // Close cURL session handle
        curl_close($ch);
    }


    public function create(Request $request)
    {

        try {
            $reqesut = $request->all();
            $paymentIntent = $this->createPaymentIntent($reqesut);
            if ($paymentIntent['status'] == true) {
                $output = [
                    'clientSecret' => $paymentIntent['data']['client_secret'],
                ];
                echo json_encode($output);
            } else {
                http_response_code(500);
                echo json_encode(['error' => "something went wrong!! Please contact our support team!!!"]);
            }
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function response(Request $request)
    {
        $response = $request->all();
        $id = $response['orderNumber'];
        $getOrderData = StripePayment::where('order_id',  $id)
            ->get()->toArray();
        $hostName = $getOrderData[0]['hostname'];
        if ($response['payResult'] === 'success') {
            $payId = $response['payResultContent'];
            StripePayment::where('order_id',  $id)
                ->update(
                    ['payment_id' => $payId]
                );
            $status = 'completed';
            $message = 'Payment is successful';
        } else {

            $status = 'failed';
            $message = 'Payment Failed';
        }
        $data = array(
            'redirectUrl' => "https://" . $hostName . "/pay-with-stripe/",
            'redirectStatus' => $response['payResult'],
            'orderId' => $id,
            'status' => $status,
            'message' => $message
        );
        dd($data);
        return view('admin.stripe.response')->with('data', $data);
    }
}
