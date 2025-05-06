<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class ColumnForTopic extends Model
{
    protected $fillable = [
        "name"
    ];

    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class, 'column_id');
    }

}
