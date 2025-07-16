
<?php

use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\MessageController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        // $user = auth()->user();
        // Check if the user has the 'admin' role
        if ($user->hasRole('admin')) {
            $messages = Message::withTrashed()->with('user')->orderBy('created_at', 'asc')->get();
            return Inertia::render('dashboard', [
                'messages' => $messages,
            ]);
        }

        $messages = Message::where('user_id', $user->id)
            ->withCount(['comments as unread_comments_count' => function ($query) {
                $query->where('read_by_user', false)
                    ->whereHas('user.roles', fn($q) => $q->where('name', 'admin'));
            }])
            ->latest()
            ->get();

        return Inertia::render('usersDashboard', [
            'messages' => $messages,
        ]);
    })->name('dashboard');
    //hanggang dito

    // Admin-specific message list
    Route::get('/admin/messages', [MessageController::class, 'adminShow'])
        ->middleware('role:admin')
        ->name('admin.messages.index');



    //Notifications
    Route::get('/notifications', [MessageController::class, 'unreadReplies'])->name('notifications');
    //Messages for user
    Route::resource('messages', MessageController::class)->except(['update']);
    Route::post('messages/{message}', [MessageController::class, 'update'])->name('messages.update');
    Route::get('/messages/{message}', [MessageController::class, 'show'])->name('messages.show');
    //delete message
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
    //restore message
    Route::patch('/messages/{message}/restore', [MessageController::class, 'restore'])
        ->middleware('role:admin')
        ->name('messages.restore');





    Route::patch('/messages/{message}/close', [MessageController::class, 'close'])
        ->name('messages.close');

    Route::post('/messages/{message}/comments', [CommentController::class, 'store'])
        ->middleware('auth')
        ->name('comments.store');
});

// Route::get('/Message', function () {
//     $messages = Message::with('user')->get();
//     return Inertia::render('usersDashboard', [
//         'messages' => $messages,
//     ]);
// });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
