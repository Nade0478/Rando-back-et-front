<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user || !in_array($user->role_id, $roles)) {
            return response()->json([
                'error' => 'Accès interdit.',
            ], 403);
        }

        return $next($request);
    }
}
