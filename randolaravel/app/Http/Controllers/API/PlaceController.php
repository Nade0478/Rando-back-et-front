<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $places = Place::all()->map(function ($place) {
            $place->estimated_time_place = Carbon::parse($place->estimated_time_place)->format('H:i');
            return $place;
        });

        return response()->json($places, 200);
    }

    public function indexHome()
    {
        $places = Place::limit(3)->orderBy('created_at', 'desc')->get()->map(function ($place) {
            $place->estimated_time_place = Carbon::parse($place->estimated_time_place)->format('H:i');
            return $place;
        });

        return response()->json($places, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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

        // Formater l'heure sans secondes
        $validatedData['estimated_time_place'] = Carbon::createFromFormat('H:i', $validatedData['estimated_time_place'])->format('H:i');

        // Gestion des fichiers
        $filename = null;
        if ($request->hasFile('image_place')) {
            $filename = time() . '_' . $request->file('image_place')->getClientOriginalName();
            $request->file('image_place')->storeAs('public/uploads', $filename);
        }

        $map_place = null;
        if ($request->hasFile('map_place')) {
            $map_place = time() . '_' . $request->file('map_place')->getClientOriginalName();
            $request->file('map_place')->storeAs('public/uploads', $map_place);
        }

        $place = Place::create(array_merge(
            $validatedData,
            ['image_place' => $filename, 'map_place' => $map_place]
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
        // Formater l'heure avant de renvoyer la réponse
        $place->estimated_time_place = Carbon::parse($place->estimated_time_place)->format('H:i');

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

        // Formater l'heure sans secondes
        $validatedData['estimated_time_place'] = Carbon::createFromFormat('H:i', $validatedData['estimated_time_place'])->format('H:i');

        // Gestion des fichiers : conserver l’ancien fichier si aucun nouveau n'est uploadé
        $filename = $place->image_place;
        if ($request->hasFile('image_place')) {
            $filename = time() . '_' . $request->file('image_place')->getClientOriginalName();
            $request->file('image_place')->storeAs('public/uploads', $filename);
        }

        $map_place = $place->map_place;
        if ($request->hasFile('map_place')) {
            $map_place = time() . '_' . $request->file('map_place')->getClientOriginalName();
            $request->file('map_place')->storeAs('public/uploads', $map_place);
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
