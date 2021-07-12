<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\APIresponseService;
use App\Service\IPGproviderService;
use Exception;

class IPGproviderController extends Controller
{
    public $apiResponse;
    public $ipgProvider;

    function __construct(APIresponseService $apiResponse, IPGproviderService $ipgProvider)
    {
        $this->apiResponse = $apiResponse;
        $this->ipgProvider = $ipgProvider;
    }

    public function get()
    {
        try {
            $getData = $this->ipgProvider->get();
            $response = $this->apiResponse->success(200, $getData);
            return $response;
        } catch (Exception $e) {
            $response = $this->apiResponse->failed($e->getMessage(), 500);
            return $response;
        }
    }
}
