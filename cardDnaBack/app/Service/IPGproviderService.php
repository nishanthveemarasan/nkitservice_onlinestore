<?php

namespace App\Service;

use App\Models\IPGprovider;

class IPGproviderService
{
    public function get()
    {
        $data = IPGprovider::paginate(10);
        return $data;
    }
}
