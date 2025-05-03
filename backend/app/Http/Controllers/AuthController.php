<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request)
    {

        // Válida os dados (Verifica se as credenciais são válidas)
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        // Tentando autenticar o usuário
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user
            ])->cookie('auth', $token, 60 * 4);;
        }

        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }

    public function logout(Request $request)
    {
        // Revogar o token atual
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });
    
        // Remover o cookie que tem o token
        $response = response()->json(['message' => 'Logout realizado com sucesso!']);
    
        // Exclui o cookie do token
        $response->withCookie(cookie()->forget('auth'));
    
        return $response;
    }
    
}