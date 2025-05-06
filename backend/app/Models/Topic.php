<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        "name",
        "description",
        "value",
        "column_id"
    ];

    public function column()
    {
        return $this->belongsTo(ColumnForTopic::class, 'column_id');
    }


}
