<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlbumRequest extends FormRequest
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
            'description' => 'nullable|string',
            'albumCover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'albumBackground' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome do álbum é obrigatório.',
            'name.max' => 'O nome do álbum não pode ter mais de :max caracteres.',
            'description.string' => 'A descrição do álbum deve ser uma string.',
            'albumCover.image' => 'O arquivo da capa do álbum deve ser uma imagem.',
            'albumCover.mimes' => 'O arquivo da capa do álbum deve ser do tipo: jpeg, png, jpg ou gif.',
            'albumCover.max' => 'O tamanho máximo do arquivo da capa do álbum é :max kilobytes.',
            'albumBackground.image' => 'O arquivo do fundo do álbum deve ser uma imagem.',
            'albumBackground.mimes' => 'O arquivo do fundo do álbum deve ser do tipo: jpeg, png, jpg ou gif.',
            'albumBackground.max' => 'O tamanho máximo do arquivo do fundo do álbum é :max kilobytes.',
        ];
    }
}
