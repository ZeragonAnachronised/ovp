<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{

    public function show()
    {
        $user = Auth::user()->load('posts');

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'posts' => $user->posts()->with('likes', 'comments')->get(),
        ]);
    }

    public function edit()
    {
        return Inertia::render('Profile/Edit', ['user' => Auth::user()]);
    }

    public function update()
    {
        $data = request()->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . Auth::id(),
            'password' => 'nullable|min:6|confirmed',
        ]);

        $user = Auth::user();
        $user->name = $data['name'];
        $user->email = $data['email'];

        if ($data['password'] ?? null) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        return redirect('/profile');
    }
}
