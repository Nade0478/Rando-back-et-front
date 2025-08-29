<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Opinion;
use Illuminate\Http\Request;

class OpinionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $opinions = Opinion::with(['place', 'user'])->paginate(50);
        return response()->json($opinions, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title_opinion' => 'required', 'string', 'max: 255',
            'content_opinion' => 'required', 'text', 'max:255',
            'note_opinion' => 'required', 'integer', 'between:1,5',
            'place_id' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
        ]);

        $opinion = Opinion::create(array_merge($request->all(),));

        return response()->json([
            'status' => 'Success',
            'data' => $opinion,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $opinion = Opinion::with(['place', 'user'])->find($id);

    if (!$opinion) {
        return response()->json([
            'error' => 'Avis introuvable',
            'message' => 'Aucun avis avec cet ID ne figure dans la base de données.',
            'id_recherché' => $id
        ], 404);
    }

    return response()->json($opinion, 200);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Opinion $opinion)
    {
        $validatedData = $request->validate([
            'title_opinion' => 'string|max:255',
            'content_opinion' => 'string|max:255',
            'note_opinion' => 'integer|between:1,5',
            'place_id' => 'integer',
            'user_id' => 'integer',
        ]);

        $opinion->update($request->all());

        return $opinion;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Opinion $opinion)
    {
        $opinion->delete();

        return response()->json(null, 204);
    }
}
