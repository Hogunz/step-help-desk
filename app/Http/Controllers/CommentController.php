<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Message $message)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = new Comment();
        $comment->message_id = $message->id;
        $comment->user_id = Auth::id();
        $comment->content = $request->input('content');

        // Set unread flag if the commenter is an admin
        if (Auth::user()->hasRole('admin')) {
            $comment->read_by_user = false;
        } else {
            $comment->read_by_user = true; // optional, user replies are considered "read"
        }

        $comment->save();

        return back();
    }
}
