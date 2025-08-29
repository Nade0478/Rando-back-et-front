<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Méthode d'inscription.
     */
    public function register(Request $request)
    {
        // Validation des données d'entrée.
        $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:255',
        ]);

        // Création de l'utilisateur.
        $user = $this->user::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => 2, // Rôle par défaut : utilisateur standard.
        ]);

        // Génération du token JWT.
        $token = JWTAuth::fromUser($user);

        // Réponse API structurée.
        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'Utilisateur créé avec succès !',
            ],
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role_id' => $user->role_id, // Ajout explicite du rôle utilisateur.
                ],
                'access_token' => [
                    'token' => $token,
                    'type' => 'Bearer',
                    'expires_in' => JWTAuth::factory()->getTTL() * 60,
                ],
            ],
        ]);
    }

    /**
     * Méthode de connexion.
     */
    public function login(Request $request)
    {
        // Validation des données d'entrée.
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        // Vérification des identifiants utilisateur.
        $credentials = $request->only('email', 'password');
        $token = JWTAuth::attempt($credentials);

        if ($token) {
            $user = JWTAuth::user();

            // Réponse API structurée en cas de succès.
            return response()->json([
                'meta' => [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'Connexion réussie.',
                ],
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role_id' => $user->role_id, // Ajout explicite du rôle utilisateur.
                    ],
                    'access_token' => [
                        'token' => $token,
                        'type' => 'Bearer',
                        'expires_in' => JWTAuth::factory()->getTTL() * 60,
                    ],
                ],
            ]);
        } else {
            // Réponse API en cas d'échec.
            return response()->json([
                'meta' => [
                    'code' => 401,
                    'status' => 'error',
                    'message' => 'Identifiants invalides.',
                ],
                'data' => [],
            ], 401);
        }
    }

    /**
     * Méthode de déconnexion.
     */
    public function logout()
    {
        // Invalidation du token JWT.
        $token = JWTAuth::getToken();
        JWTAuth::invalidate($token);

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'Déconnexion réussie.',
            ],
            'data' => [],
        ]);
    }

    public function currentUser(Request $request)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json([
                'meta' => [
                    'code' => 404,
                    'status' => 'error',
                    'message' => 'Utilisateur introuvable.',
                ],
                'data' => []
            ], 404);
        }

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'Utilisateur récupéré avec succès.',
            ],
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id,
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'meta' => [
                'code' => 401,
                'status' => 'error',
                'message' => 'Token invalide ou utilisateur non authentifié.',
            ],
            'data' => []
        ], 401);
    }
}

}