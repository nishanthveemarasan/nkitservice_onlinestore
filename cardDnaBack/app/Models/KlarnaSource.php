<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KlarnaSource extends Model
{
    use HasFactory;
    protected $table = "klarna_sources";
    protected $guarded = [];
}
