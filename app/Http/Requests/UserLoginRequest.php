<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class UserLoginRequest extends FormRequest
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
            'email' => 'email|required|string|max:255',
            'password' => 'required|string',
        ];
    }

    public function messages(){
        return [
            'email.email' => 'Digite um email válido',

        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    public function authenticate(): void
    {

        if (!auth()->attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            throw new HttpResponseException(response()->json(['message' => "Usuário não encontrado"], 401));
        }

    }
}
