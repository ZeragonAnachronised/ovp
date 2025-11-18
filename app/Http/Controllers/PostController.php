<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::with(['user', 'comments', 'likes'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'user' => Auth::user(),
        ]);
    }

    public function show(Post $post)
    {
        $post->load(['user', 'comments.user', 'likes']);

        return Inertia::render('Posts/Show', [
            'post' => $post,
            'user' => Auth::user(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store()
    {
        $data = request()->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data['user_id'] = Auth::id();

        if (request()->hasFile('image')) {
            $path = request()->file('image')->store('img', 'public');
            $data['image'] = $path;
        }

        $post = Post::create($data);

        return redirect("/posts/{$post->id}");
    }

    public function edit(Post $post)
    {
        $this->authorize($post->user_id);

        return Inertia::render('Posts/Edit', ['post' => $post]);
    }

    public function update(Post $post)
    {
        $this->authorize($post->user_id);

        $data = request()->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($data);

        return redirect("/posts/{$post->id}");
    }

    public function destroy(Post $post)
    {
        $this->authorize($post->user_id);

        $post->delete();

        return redirect('/');
    }

    private function authorize($owner_id)
    {
        if (Auth::id() != $owner_id) {
            return back();
        }
    }

}
