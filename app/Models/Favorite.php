<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'created_at',
        'updated_at',
    ];
}
