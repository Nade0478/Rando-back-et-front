<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name' => 'required|string',
            'role_id' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'confirmed', Password::defaults()]
        ]);

        $user = new User();
        $user->fill($formFields);
        $user->password = bcrypt($formFields['password']);
        $user->save();

        return response()->json($user);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $formFields = $request->validate([
            'name' => 'sometimes|string',
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['sometimes', 'confirmed']
        ]);

        $user->fill($formFields);
        if (isset($formFields['password'])) {
            $user->password = bcrypt($formFields['password']);
        }
        $user->save();

        return response()->json([
            'message' => 'Utilisateur mis à jour avec succès.',
            'user' => $user
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['success' => 'Utilisateur supprimé avec succès']);
    }


}
