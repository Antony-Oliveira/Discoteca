<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class StoreTrackRequest extends FormRequest
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
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required',
            'duration' => 'required',
            'albumId' => 'required|exists:albums,id',
        ];
    }

    public function messages(): array

    {
        return [
            'name.required' => 'O nome da faixa é obrigatório.',
            'duration.required' => 'A duração da faixa é obrigatória.',
            'albumId.required' => 'O ID do álbum é obrigatório.',
            'albumId.exists' => 'O ID do álbum especificado não existe na tabela de álbuns.',
            'image.required' => 'O campo de imagem é obrigatório.',
            'image.mimes' => 'A imagem deve ser de um dos formatos: jpeg, png, jpg ou gif.',
            'image.max' => 'O tamanho máximo da imagem é de 2048 KB.'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
