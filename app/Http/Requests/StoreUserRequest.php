<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'email|required|string|max:255|unique:users,email',
            'password' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome deve ser uma string.',
            'name.max' => 'O nome não pode ter mais de :max caracteres.',
            'email.email' => 'Digite um e-mail válido.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.string' => 'O e-mail deve ser uma string.',
            'email.max' => 'O e-mail não pode ter mais de :max caracteres.',
            'email.unique' => 'Este e-mail já está em uso!!!',
            'password.required' => 'A senha é obrigatória.',
            'password.string' => 'A senha deve ser uma string.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        if ($errors->has('email') && $errors->first('email') === 'Este e-mail já está em uso!!!') {
            throw new HttpResponseException(response()->json($validator->errors(), 409));
        }
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
