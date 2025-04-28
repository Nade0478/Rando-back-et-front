<?php

namespace App\Models;

use App\Models\User;
use App\Models\Place;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Opinion extends Model
{
    use HasFactory;

    // Définir les attributs pouvant être remplis en masse
    protected $fillable = ['title_opinion', 'content_opinion', 'note_opinion', 'user_id', 'place_id'];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec le lieu
    public function place()
    {
        return $this->belongsTo(Place::class);
    }

}
