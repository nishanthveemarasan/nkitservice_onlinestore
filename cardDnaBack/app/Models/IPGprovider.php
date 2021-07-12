<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IPGprovider extends Model
{
    use HasFactory;
    protected $table = "ipgproviders";
    protected $guarded = [];
}
