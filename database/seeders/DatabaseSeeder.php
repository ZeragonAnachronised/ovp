<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::factory(5)->create();

        $users->each(function ($user) use ($users) {
            $posts = Post::factory(3)->create(['user_id' => $user->id]);

            $posts->each(function ($post) use ($users) {
                Comment::factory(2)->create(['post_id' => $post->id, 'user_id' => $users->random()->id]);

                $users->random(2)->each(function ($user) use ($post) {
                    Like::factory()->create(['post_id' => $post->id, 'user_id' => $user->id]);
                });
            });
        });
    }
}
