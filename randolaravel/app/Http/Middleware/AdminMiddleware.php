<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            // Vérifier si l'utilisateur est bien authentifié
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expiré. Veuillez vous reconnecter.'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalide.'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token absent.'], 401);
        }

        // Vérifier si l'utilisateur est un admin (role_id = 1)
        if (!$user || $user->role_id !== 1) {
            return abort(403, 'Accès interdit. Seuls les administrateurs peuvent voir cette page.');
        }

        return $next($request);
    }
}
