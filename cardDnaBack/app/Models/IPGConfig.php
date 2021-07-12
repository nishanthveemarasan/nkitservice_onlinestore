<?php

namespace App\Models;

use App\Models\Client;
use App\Models\IPGprovider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IPGConfig extends Model
{
    use HasFactory;
    protected $table = "ipg_configs";
    protected $guarded = [];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function provider()
    {
        return $this->belongsTo(IPGprovider::class, 'provider_id');
    }
}
