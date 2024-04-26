<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'activeTab' => session('activeTab'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // validate user input
        $request->user()->fill($request->validated());

        // check if user has changed email
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // check if user already have avatar
        $isAvatarChanged = $request->user()->isDirty('avatar');

        // if old avatar exists there is file that needs to be deleted
        if ($isAvatarChanged) {
            $oldAvatar = $request->user()->getOriginal('avatar');
            // check if file exists
            $oldAvatar && $fileExists = Storage::disk('profile-photos')->exists($oldAvatar);

            if ($oldAvatar && $fileExists) {
                Storage::disk('profile-photos')->delete($oldAvatar);
            }
        }

        // if new avatar is uploaded we need to store it
        if ($request->hasFile('avatar')) {
            $avatarName = $request->file('avatar')->store('/', 'profile-photos');
            $request->user()->avatar = $avatarName;
        }
        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        if ($user->avatar) {
            // check if file exists
            $fileExists = Storage::disk('profile-photos')->exists($user->avatar);

            if ($fileExists) {
                Storage::disk('profile-photos')->delete($user->avatar);
            }
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/')->with("accountDeleted", true);
    }
}
