<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|min:2|max:255',
            'last_name' => 'required|string|min:2|max:255',
            'email' => 'required|email:rfc,filter|unique:' . User::class,
            'password' => ['bail', 'required', Password::defaults()],
            'password_confirmation' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'password.min' => 'Password must be at least 8 characters.',
            'password_confirmation.required' => 'Please confirm your password.',
        ];
    }

    /**
     * Add password_confirmation validation error in case of password mismatch
     * to be displayed on the proper form field
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // if there are password errors don't proceed
            if ($validator->errors()->has('password')) {
                return; // Exit early if there are validation errors
            }

            // check if passwords match and add error if they don't
            if ($this->password && $this->password_confirmation && $this->password !== $this->password_confirmation) {
                $validator->errors()->forget('password');
                $validator->errors()->add('password_confirmation', 'Passwords don\'t match');
            }
        });
    }
}
