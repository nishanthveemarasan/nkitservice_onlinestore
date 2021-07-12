<?php

namespace App\Service;

use Illuminate\Support\Facades\Crypt;

class encryptionService
{
    public static function decrypt($string)
    {
        return Crypt::decryptString($string);
    }
    public static function encrypt($string)
    {
        return Crypt::encryptString($string);
    }
}
