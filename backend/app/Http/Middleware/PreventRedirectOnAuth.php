<?php 
namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;

class PreventRedirectOnAuth
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
        // Não aplica o middleware nessas rotas
        if ($request->is('api/login') || $request->is('api/register')) {
            return $next($request);
        }

       // Verifica se o usuário está autenticado através do cookie
       if (Auth::check() === false) {
        // Retorna erro 401 em vez de redirecionar
        return response()->json(['message' => 'Unauthenticated'], 401);
    }


        // Continua a execução da requisição
        return $next($request);
    }
}
