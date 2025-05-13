<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $places = Place::all();
        return response()->json($places, 200);
    }

    public function indexHome()
    {
        $places = Place::limit(3)->orderBy('created_at', 'desc')->get();
        return response()->json($places, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Place $place)
{
    $validatedData = $request->validate([
        'name_place' => ['required', 'string', 'max:255'],
        'latitude_place' => ['required', 'numeric'],
        'longitude_place' => ['required', 'numeric'],
        'description_place' => ['required', 'string', 'max:1000'],
        'distance_place' => ['required', 'numeric'],
        'difficulty_place' => ['required', 'in:Facile,Moyen,Difficile'],
        'estimated_time_place' => ['required', 'date_format:H:i'],
        'image_place' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:10000'],
        'map_place' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:10000'],
    ]);

    $filename = "";
    if ($request->hasFile('image_place')) {
        $filenameWithExt = $request->file('image_place')->getClientOriginalName();
        $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $extension = $request->file('image_place')->getClientOriginalExtension();
        $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
        $path = $request->file('image_place')->storeAs('public/uploads', $filename);
    } else {
    $filename = null;
    }

    $map_place = null;
    if ($request->hasFile('map_place')) {
        $filenameWithExt = $request->file('map_place')->getClientOriginalName();
        $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $extension = $request->file('map_place')->getClientOriginalExtension();
        $map_place = $filenameWithoutExt . '_' . time() . '.' . $extension;
        $request->file('map_place')->storeAs('public/uploads', $map_place);
    } else {
        $filename = null;
    }

        $place->create(array_merge(
            $validatedData,
            [
                'image_place' => $filename, 'map_place' => $map_place
            ]
        ));

        return response()->json([
            'status' => 'Success',
            'data' => $place,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Place $place)
    {
        return response()->json($place, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        $validatedData = $request->validate([
            'name_place' => ['required', 'string', 'max:255'],
            'latitude_place' => ['required', 'numeric'],
            'longitude_place' => ['required', 'numeric'],
            'description_place' => ['required', 'string', 'max:1000'],
            'distance_place' => ['required', 'numeric'],
            'difficulty_place' => ['required', 'in:Facile,Moyen,Difficile'],
            'estimated_time_place' => ['required', 'date_format:H:i'],
            'image_place' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:10000'],
            'map_place' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:10000'],
        ]);

        $filename = "";
        if ($request->hasFile('image_place')) {
            $filenameWithExt = $request->file('image_place')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image_place')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('image_place')->storeAs('public/uploads', $filename);
        } else {
        $filename = null;
            }
        $map_place = null;
        if ($request->hasFile('map_place')) {
            $filenameWithExt = $request->file('map_place')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('map_place')->getClientOriginalExtension();
            $map_place = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $request->file('map_place')->storeAs('public/uploads', $map_place);
        } else {
            $filename = null;
        }

        $place->update(array_merge(
            $validatedData,
            ['image_place' => $filename, 'map_place' => $map_place]
        ));

        return response()->json([
            'status' => 'Success',
            'data' => $place,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        $place->delete();
        return response()->json(null, 204);
    }
}