<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Http\Requests\StoreAlbumRequest;

class AlbumController extends Controller
{

    private string $defaultImage = "storage/default/default.jpg";

    public function index()
    {
        $albums = Album::with('tracks')->get();

        return response()->json($albums);
    }

    public function store(StoreAlbumRequest $request)
    {
        $albumNameSlug = \Str::slug($request->input('name'));
        $albumPath = 'albums/' . $albumNameSlug . '/';

        $coverFileName = null;
        $backgroundFileName = null;

        if ($request->hasFile('albumCover')) {
            $coverFileName = $albumNameSlug . '_' . time() . '.' . $request->file('albumCover')->getClientOriginalExtension();
            $request->file('albumCover')->storeAs('public/' . $albumPath, $coverFileName);
        }

        if ($request->hasFile('albumBackground')) {
            $backgroundFileName = $albumNameSlug . '_' . time() . '.' . $request->file('albumBackground')->getClientOriginalExtension();
            $request->file('albumBackground')->storeAs('public/' . $albumPath, $backgroundFileName);
        }

        $coverUrl = $coverFileName ? 'storage/' . $albumPath . $coverFileName : $this->defaultImage;
        $backgroundUrl = $backgroundFileName ? 'storage/' . $albumPath . $backgroundFileName : $this->defaultImage;

        $album = Album::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'cover_url' => $coverUrl,
            'background_url' => $backgroundUrl
        ]);

        return response()->json(['ok', 'album' => $album]);
    }



    public function show(Album $album)
    {
        $album = $album->load("tracks");
        return response()->json($album);
    }

    public function destroy(Album $album)
    {
        $album->delete();
        return response()->json(['ok'], 200);
    }
}
