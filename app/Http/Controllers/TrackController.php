<?php

namespace App\Http\Controllers;

use App\Models\Track;
use App\Http\Requests\StoreTrackRequest;
use App\Http\Requests\UpdateTrackRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Album;

class TrackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrackRequest $request)
    {
        \Log::info('e');
        $albumNameSlug = Str::slug($request->input('album_name'));
        \Log::info('e');

        $trackNameSlug = Str::slug($request->input('name'));
        \Log::info('e');

        $trackPath = 'albums/' . $albumNameSlug . '/tracks/';
        \Log::info('e');

        if ($request->hasFile('image')) {
            $fileName = $trackNameSlug . '_' . time() . '.' . $request->file('image')->getClientOriginalExtension();

            $trackCoverPath = $request->file('image')->storeAs('public/' . $trackPath, $fileName);


            $coverUrl = 'storage/' . $trackPath . $fileName;
        } else {
            $coverUrl = Album::findOrFail($request->input('albumId'))->cover_url;
        }


        $track = Track::create([
            'name' => $request->input('name'),
            'duration' => $request->input('duration'),
            'album_id' => $request->input('albumId'),
            'cover_url' => $coverUrl
        ]);


        return response()->json(['ok', 'track' => $track]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Track $track)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Track $track)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrackRequest $request, Track $track)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroya(Track $track)
    {
        try {
            $track->deleteOrFail();

            return response()->json(['message' => $track->name . " foi deletada do album."], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $track->name . " foi deletada do album."], 400);
        }
    }
}
