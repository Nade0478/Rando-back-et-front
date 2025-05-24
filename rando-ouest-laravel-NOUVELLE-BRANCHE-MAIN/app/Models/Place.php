<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_place',
        'longitude_place',
        'latitude_place',
        'description_place',
        'image_place',
        'map_place',
        'distance_place',
        'difficulty_place',
        'estimated_time_place'
        ] ;
}
