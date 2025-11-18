<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function store(Post $post)
    {
        $data = request()->validate([
            'content' => 'required|string',
        ]);

        $post->comments()->create([
            'user_id' => Auth::id(),
            'content' => $data['content'],
        ]);

        return back();
    }

    public function update(Comment $comment)
    {
        $this->authorize($comment->user_id);

        $data = request()->validate([
            'content' => 'required|string',
        ]);

        $comment->update($data);

        return back();
    }

    public function destroy(Comment $comment)
    {
        $this->authorize($comment->user_id);

        $comment->delete();

        return back();
    }

    private function authorize($owner_id)
    {
        if (Auth::id() != $owner_id) {
            return back();
        }
    }

}
