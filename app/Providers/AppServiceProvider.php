<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\Post;
use App\Policies\CommentPolicy;
use App\Policies\PostPolicy;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Post::class => PostPolicy::class,
        Comment::class => CommentPolicy::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Inertia::share([
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
