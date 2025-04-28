<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Manage_place;
use Illuminate\Http\Request;

class Manage_placeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $manage_places = Manage_place::all();
        return response()->json($manage_places);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $manage_place = Manage_place::create($request->all());
        return response()->json($manage_place, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Manage_place $manage_place)
    {
        return response()->json($manage_place);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Manage_place $manage_place)
    {
        $manage_place->update($request->all());
        return response()->json($manage_place);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manage_place $manage_place)
    {
        $manage_place->delete();
        return response()->json(null, 204);
    }
}
