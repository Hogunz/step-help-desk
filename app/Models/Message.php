<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'subject',
        'message',
        'image',
        'ticket_status',
        'ticket_number',
        'user_id',
        'start_time',
        'end_time',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function images()
    {
        return $this->hasMany(MessageImage::class);
    }
}
