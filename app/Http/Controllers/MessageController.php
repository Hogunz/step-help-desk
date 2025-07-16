<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function adminShow()
    {
        $messages = Message::withTrashed()->with('user')->latest()->get();
        return Inertia::render('users/messages/index', [
            'messages' => $messages,
        ]);
    }

    public function index()
    {

        $user = Auth::user();
        $messages = Message::where('user_id', $user->id)
            ->withCount(['comments as unread_comments_count' => function ($query) {
                $query->where('read_by_user', false)
                    ->whereHas('user.roles', fn($q) => $q->where('name', 'admin'));
            }])
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('usersDashboard', [
            'messages' => $messages,
        ]);
    }

    public function create()
    {
        return Inertia::render('users/messages/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ticketNumber = $this->generateTicketNumber();

        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
            'ticket_status' => 'required|string|in:open,closed|max:50',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240', // allow multiple
        ]);

        $message = Message::create([
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'ticket_status' => $request->input('ticket_status'),
            'user_id' => Auth::id(),
            'ticket_number' => $ticketNumber,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');
                $message->images()->create(['path' => $path]);
            }
        }

        return redirect()->route('messages.index')->with('success', 'Message created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        // Load necessary relationships
        $message->load(['user', 'comments.user', 'images']);

        // ✅ Mark comments as read if the current user owns the ticket
        if (Auth::id() === $message->user_id) {
            $message->comments()
                ->where('read_by_user', false)
                ->update(['read_by_user' => true]);
        }

        return Inertia::render('users/messages/show', [
            'messages' => $message,
        ]);
    }

    public function edit(Message $message)
    {
        return Inertia::render('users/messages/edit', [
            'message' => $message,
        ]);
    }

    public function update(Request $request, Message $message)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
            'ticket_status' => 'required|string|in:open,closed|max:50',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');
                $message->images()->create(['path' => $path]);
            }
        }

        $message->subject = $request->input('subject');
        $message->message = $request->input('message');
        $message->ticket_status = $request->input('ticket_status');
        $message->save();

        return redirect()->route('messages.index')->with('success', 'Message updated successfully.');
    }

    public function destroy(Message $message)
    {
        $user = Auth::user();

        if ($user->hasRole('admin')) {
            $message->delete(); // soft delete
            return back()->with('success', 'Ticket archived (soft deleted) successfully.');
        }

        if ($user->id === $message->user_id) {
            $message->forceDelete(); // permanently delete
            return back()->with('success', 'Ticket permanently deleted.');
        }

        abort(403, 'Unauthorized');
    }

    public function restore($id)
    {
        $user = Auth::user();

        if (!$user->hasRole('admin')) {
            abort(403, 'Unauthorized');
        }

        $message = Message::onlyTrashed()->findOrFail($id);
        $message->restore();

        return back()->with('success', 'Ticket restored successfully.');
    }

    public function close(Message $message)
    {
        if (Auth::id() !== $message->user_id && !Auth::user()->hasRole('admin')) {
            abort(403, 'Unauthorized');
        }

        $message->ticket_status = 'closed';
        $message->save();

        return redirect()->back()->with('success', 'Ticket closed successfully.');
    }

    private function generateTicketNumber()
    {
        do {
            $number = str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        } while (Message::where('ticket_number', $number)->exists());

        return $number;
    }

    public function unreadReplies()
    {
        $userId = Auth::id();

        // Get all unread admin comments related to the user's messages
        $unreadComments = \App\Models\Comment::whereHas('message', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('read_by_user', false)
            ->whereHas('user.roles', fn($q) => $q->where('name', 'admin'))
            ->with(['user', 'message'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('users/messages/notifications', [
            'notifications' => $unreadComments,
        ]);
    }
}
