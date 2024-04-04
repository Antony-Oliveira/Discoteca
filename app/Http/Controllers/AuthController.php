<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        $token = $user->createToken("sth_")->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token], 200);
    }

    public function login(UserLoginRequest $request){
        $request->authenticate();
        auth()->login($request->user());
        $user = $request->user();
        $token = $user->createToken('sth_')->plainTextToken;
        return response()->json(['message' => 'Usuário autenticado', 'user' => $user, 'token' => $token], 200);
    }

    public function logout(User $user){

        $user->tokens()->delete();

        return response()->json(['ok']);
    }
}
