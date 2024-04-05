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

    public function store(StoreTrackRequest $request)
    {
        $albumNameSlug = Str::slug($request->input('album_name'));

        $trackNameSlug = Str::slug($request->input('name'));

        $trackPath = 'albums/' . $albumNameSlug . '/tracks/';

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

    public function destroy(Track $track)
    {
        try {
            $track->deleteOrFail();

            return response()->json(['message' => $track->name . " foi deletada do album."], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $track->name . " foi deletada do album."], 400);
        }
    }
}
