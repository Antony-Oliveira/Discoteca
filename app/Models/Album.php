<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'cover_url', 'background_url', 'description'];

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }

}
