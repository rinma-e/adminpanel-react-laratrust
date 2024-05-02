<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements LaratrustUser, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRolesAndPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the user's avatar URL.
     *
     * @return string|null
     */
    public function getAvatarUrlAttribute(): ?string
    {
        return $this->avatar ? Storage::disk('profile-photos')->url($this->avatar) : null;
    }

    /**
     * Get the user's roles.
     *
     * @return array
     */
    public function getRolesAttribute(): array
    {
        return $this->getRoles();
    }

    /**
     * Get the user's permissions.
     *
     * @return  array
     */
    public function getPermissionsAttribute(): array
    {
        return $this->allPermissions()->pluck('name')->toArray();
    }

    /**
     * Append additional attributes to the model.
     *
     * @var array
     */
    protected $appends = [
        'avatar_url',
        'roles',
        'permissions',
    ];
}
