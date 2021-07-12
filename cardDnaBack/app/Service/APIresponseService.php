<?php

namespace App\Service;

class APIresponseService
{

    public function success($code, $data = [], $msg = 'Completed', $error = [])
    {
        $response = [
            'success' => true,
            'http_status' => $code,
            'data' => $data,
            'msg' => $msg,
            'error' => $error
        ];

        return response()->json($response, $code);
    }

    public function failed($exception, $code, $error = [])
    {

        $msg = 'failed';
        $response = [
            'success' => false,
            'http_status' => $code,
            'data' => [],
            'msg' => $msg,
            'error' => $exception
        ];

        return response()->json($response, $code);
    }

    public function httpStatus($code)
    {
        $httpStatus = config('httpStatus');
        return $httpStatus[$code];
    }
}
