<?php

namespace App\Http\Controllers;

use App\Models\IPGConfig;
use App\Models\KlarnaSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Klarnav2Controller extends Controller
{
    public function index(Request $request)
    {
        $payment_request = $request->all();
        //  dd($payment_request);
        $testMode = $payment_request['testMode'];
        $paymentMethod = $payment_request['payment_method'];
        $verifyToken = $this->verifyToken($payment_request, $testMode);

        if ($verifyToken['status'] === 'success') {
            $config = $verifyToken['data']['config_json'];
            if ($testMode === 'test') {
                $config = $verifyToken['data']['config_json'];
            } elseif ($testMode === 'live') {
                $config = $verifyToken['data']['live_config_json'];
            }
            //   dd($testMode, $config);
            $createSource = $this->createKlarnaSource($payment_request, $config);
            if ($createSource['status'] == true) {
                $storeSource = new KlarnaSource;
                $storeSource->source_id = $createSource['data']['id'];
                $storeSource->order_id = $payment_request['orderId'];
                $storeSource->amount = ($payment_request['amount'] / 100);
                $storeSource->payment_request = json_encode($payment_request);
                $storeSource->config = $config;
                $storeSource->host_name = $verifyToken['data']['host_name'];
                $storeSource->transaction_mode = $testMode;
                $storeSource->save();
                if ($paymentMethod === 'pay_now') {
                    return redirect()->to($createSource['data']['klarna']['pay_now_redirect_url']);
                } elseif ($paymentMethod === 'pay_later') {
                    return redirect()->to($createSource['data']['klarna']['pay_later_redirect_url']);
                } elseif ($paymentMethod === 'pay_over_time') {
                    return redirect()->to($createSource['data']['klarna']['pay_over_time_redirect_url']);
                }
            } else {
                $status = 'failed';
                if (isset($createSource['data']['error']['message'])) {
                    $message =  $createSource['data']['error']['message'];
                } else {

                    $message = 'Payment Failed. please contact administrator';
                }

                $data = array(
                    'redirectUrl' => "https://" . $verifyToken['data']['host_name'] . "/pay-with-klarna/",
                    'redirectStatus' => 'failed',
                    'orderId' => $payment_request['orderId'],
                    'status' => $status,
                    'message' => $message
                );
                return view('admin.Klarna.response')->with('data', $data);
            }
        } else {
            $status = 'failed';
            $message = (isset($verifyToken['data']['error']['message'])) ? ($verifyToken['data']['error']['message']) : 'Payment Failed. please contact administrator';
            $data = array(
                'redirectUrl' => "https://" . $verifyToken['data']['host_name'] . "/pay-with-klarna/",
                'redirectStatus' => 'failed',
                'orderId' => $payment_request['orderId'],
                'status' => $status,
                'message' => $message
            );
            return view('admin.Klarna.response')->with('data', $data);
        }
    }


    public function verifyToken($data, $testMode)
    {

        $getProvider = IPGConfig::where('provider_id', function ($query) use ($data) {
            $query->select('id')
                ->from('ipgproviders')
                ->where('provider_code', $data['gatewayToken']);
        })
            ->where('host_name', $data['hostName'])->with('client', 'provider')
            ->whereNotNull('config_json')->where('status', '1')->get()->toArray();
        //  dd($getProvider, $data, $testMode);
        if (count($getProvider) === 0) {
            return array('status' => 'failed', 'data' => array());
        } elseif (count($getProvider) === 1) {
            if ($testMode === 'test') {
                $allowedTestTransaction = $getProvider[0]['allowed_test_number'];
                //get the test count
                $count = KlarnaSource::where('host_name', $getProvider[0]['host_name'])
                    ->where('transaction_mode', 'test')->count();
                if ($count > $allowedTestTransaction) {
                    $data = array(
                        'host_name' => $getProvider[0]['host_name'],
                        'error' => array(
                            'message' => 'You have exceeded the allowed Test transaction!!. Please contact our admin team to enable the Test mode again!!. We are sorry for your inconvenience '
                        ),
                    );
                    return array('status' => 'failed', 'data' => $data);
                }
            }
            $getToken = $getProvider[0]['token'];
            $verifyToken = md5($getToken) === $data['token'] ? true : false;
            if ($verifyToken) {
                return array('status' => 'success', 'data' => $getProvider[0]);
            } else {
                return array('status' => 'failed', 'data' => array(
                    'host_name' => $getProvider[0]['host_name'],
                ));
            }
        }
    }

    public function createKlarnaSource($payment_request, $ipg_config)
    {
        $config = json_decode($ipg_config, true);
        $countryCode = $config['klarna_country_code'];
        $language = strtolower($config['klarna_lang_code']);
        $locale = $config['klarna_lang_code'];

        $url = 'https://api.stripe.com/v1/sources';
        $sourceArray = array(
            "type" => "klarna",
            "amount" => $payment_request['amount'],
            "currency" => strtolower($payment_request['currency']),
            "klarna" => array(
                "product" => 'payment',
                "purchase_country" => $countryCode,
                "first_name" => $payment_request['first_name'],
                "last_name" => $payment_request['last_name'],
                "locale" => $locale,
                // "custom_payment_methods" => 'payin4,installments',
            ),
            "source_order" => array(
                "items" => array(
                    array(
                        "type" => 'sku',
                        "description" => "#description " . $payment_request['orderId'],
                        "quantity" => 1,
                        "currency" => strtolower($payment_request['currency']),
                        "amount" => $payment_request['amount'],
                    ),

                )
            ),
            "owner" => array(
                "email" => $payment_request['email'],
                // "phone" => (isset($payment_request['x_customer_phone']))?$payment_request['x_customer_phone']:'',
                "address" => array(
                    'city' => $payment_request['city'],
                    'country' => $countryCode,
                    'line1' => $payment_request['line1'],
                    'postal_code' => $payment_request['postal_code'],
                    // 'state' => $payment_request['x_customer_phone'],
                )
            ),
            "flow" => "redirect",
            "redirect" => array(
                "return_url" => url('api/klarna/response') . '?key=' . $payment_request['orderId']
            )
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($sourceArray));

        // Set HTTP Header for POST request
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/x-www-form-urlencoded",
            'Authorization: Bearer ' . $config['klarna_api_key']
        ));

        // Submit the POST request
        $result = curl_exec($ch);
        $info = curl_getinfo($ch);
        if ($info['http_code'] == 200) {
            return ['status' => true, 'data' => json_decode($result, true)];
        } else {
            return ['status' => false, 'data' => json_decode($result, true)];
        }
    }

    public function response(Request $request)
    {
        $getResonse = $request->all();
        Log::info($getResonse);
        KlarnaSource::where('source_id',  $getResonse['source'])
            ->where('order_id', $getResonse['key'])->update(
                ['source_response' => json_encode($getResonse)]
            );
        $getSource = KlarnaSource::where('source_id', $getResonse['source'])->get()->toArray();
        $hostName = $getSource[0]['host_name'];
        $id = $getResonse['key'];
        $sourceId = $getResonse['source'];
        if ($getResonse['redirect_status'] == 'succeeded') {
            $status = 'pending';
            $message = 'Payment is Pending';
        } else {
            $status = 'failed';
            $message = 'Payment Failed';
        }
        $data = array(
            'redirectUrl' => "https://" . $hostName . "/pay-with-klarna/",
            'redirectStatus' => $getResonse['redirect_status'],
            'orderId' => $id,
            'status' => $status,
            'message' => $message
        );
        return view('admin.Klarna.response')->with('data', $data);
    }

    public function callback(Request $request)
    {
        $callBack = $request->all();
        $status = "";
        $message = "";
        $sourceId = $request['data']['object']['id'];
        $getSourceDetails = KlarnaSource::where('source_id', $sourceId)->get()->toArray();
        $payment = json_decode($getSourceDetails[0]['payment_request'], true);
        $config = json_decode($getSourceDetails[0]['config'], true);
        $hostName = $getSourceDetails[0]['host_name'];
        if ($callBack['type'] == 'source.chargeable') {

            $url = 'https://api.stripe.com/v1/charges';
            $payload = [
                'amount' => $payment['amount'],
                'currency' => $payment['currency'],
                'capture' => "true",
                'source' => $sourceId
            ];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                "Content-Type: application/x-www-form-urlencoded",
                'Authorization: Bearer ' . $config['klarna_api_key']
            ));
            $result = curl_exec($ch);
            $info = curl_getinfo($ch);
            if ($info['http_code'] == 200) {
                $response = json_decode($result, true);
                $paymentId = $response['id'];
                $klarnaChargeResponse = [
                    'charge_id' => $paymentId,
                    'charge_response' => json_encode($response),

                ];
                KlarnaSource::where('source_id',  $sourceId)->update($klarnaChargeResponse);

                if ($response['status'] == 'succeeded') {
                    $data = array(
                        'order_redirect_status' => "succeeded",
                        'order_id' => $payment['orderId'],
                    );
                    $this->curlResponse($data, $hostName);
                } else {
                    $data = array(
                        'order_redirect_status' => "failed",
                        'order_id' => $payment['orderId'],
                    );
                    $this->curlResponse($data, $hostName);
                }
            } else {
                $data = array(
                    'order_redirect_status' => "failed",
                    'order_id' => $payment['orderId'],
                );
                $this->curlResponse($data, $hostName);
            }
        } else {
            $data = array(
                'order_redirect_status' => "failed",
                'order_id' => $payment['orderId'],
            );
            $this->curlResponse($data, $hostName);
        }
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
