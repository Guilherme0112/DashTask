<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request): JsonResponse
    {
        // Valida os dados
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Tenta autenticar o usuário
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            // Cria um token para o usuário
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user,
            ])->cookie('auth', $token, 60 * 4);
        }

        // Se as credenciais forem inválidas
        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }

    public function logout(Request $request): JsonResponse
{
    // Verifica se o usuário está autenticado
    if ($request->user()) {
        // Revoga o token de acesso atual (caso seja um PersonalAccessToken)
        $token = $request->user()->currentAccessToken();

        // Verifica se é um token de acesso pessoal (PersonalAccessToken)
        if ($token instanceof PersonalAccessToken) {
            // Deleta o token
            $token->delete();
        }

        // Exclui o cookie de autenticação
        return response()->json(['message' => 'Desconectado com sucesso'])
                         ->withCookie(cookie()->forget('auth'));
    }

    return response()->json(['message' => 'Não autenticado'], 401);
}

    


}