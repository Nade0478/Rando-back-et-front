<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\Manage_placeController;
use App\Http\Controllers\API\OpinionController;
use App\Http\Controllers\API\PlaceController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//  Route pour récupérer l'utilisateur connecté avec Sanctum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//  Authentification API
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

//  Routes API publiques (sans authentification)
Route::apiResource('article', ArticleController::class)->only(['index', 'show']);
Route::apiResource('place', PlaceController::class)->only(['index', 'show']);
Route::apiResource('opinion', OpinionController::class)->only(['index', 'show']);
Route::get('/article-home', [ArticleController::class, 'indexHome']);
Route::get('/place-home', [PlaceController::class, 'indexHome']);

//  Routes protégées par JWT
Route::middleware('auth:api')->group(function () {
    Route::get('/currentuser', [AuthController::class, 'currentUser']);
});

    //  Gestion des catégories
    Route::apiResource('category', CategoryController::class);

    //  Gestion des lieux
    Route::apiResource('place', PlaceController::class)->except(['index', 'show']);

    //  Gestion des avis
    Route::apiResource('opinion', OpinionController::class)->except(['index', 'show']);

    //  Gestion des articles
    Route::apiResource('article', ArticleController::class)->except(['index', 'show']);

    //  Gestion des utilisateurs
    Route::apiResource('user', UserController::class);

    //  Gestion des rôles
    Route::apiResource('role', RoleController::class);

    //  Gestion des places administrées
    Route::apiResource('manage_place', Manage_placeController::class);

    //  Récupération des données liées à un utilisateur
    Route::get('/user/{id}/opinion', [UserController::class, 'getOpinionsByUser']);
    Route::get('/user/{id}/article', [UserController::class, 'getArticlesByUser']);
    Route::get('/user/{id}/place', [UserController::class, 'getPlacesByUser']);
    Route::get('/user/{id}/manage_place', [UserController::class, 'getManagePlacesByUser']);
    Route::get('/user/{id}/role', [UserController::class, 'getRolesByUser']);
    Route::get('/user/{id}/category', [UserController::class, 'getCategoriesByUser']);

//  Mise à jour du profil utilisateur via Sanctum
Route::middleware('auth:sanctum')->put('/user/profil', [UserController::class, 'update']);
