<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class ValidateAuthTokenFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        // Não aplica o middleware nas rotas de login e registro
        if ($request->is('api/login') || $request->is('api/register')) {
            return $next($request);
        }

        // Verifica se o cookie 'auth' está presente
        if ($cookie = $request->cookie('auth')) {
            // Tenta encontrar o token no banco de dados
            $token = PersonalAccessToken::findToken($cookie);

            // Se o token existir
            if ($token) {
                // Verifica se o token está expirado
                if ($token->expires_at && $token->expires_at->isPast()) {
                    return response()->json(['message' => 'Token expirado'], 401);
                }

                // Verifica se o token foi revogado (se necessário)
                if ($token->revoked) {
                    return response()->json(['message' => 'Token revogado'], 401);
                }

                // Autentica o usuário
                $user = $token->tokenable;
                Auth::login($user);
            } else {
                // Caso o token não exista ou seja inválido
                return response()->json(['message' => 'Token inválido'], 401);
            }
        } else {
            // Caso o cookie não exista
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        return $next($request);
    }
}
