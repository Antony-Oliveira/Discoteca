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
    public function store(StoreAlbumRequest $request)
    {
        $albumNameSlug = \Str::slug($request->input('name'));
        $albumPath = 'albums/' . $albumNameSlug . '/';

        $coverFileName = null;
        $backgroundFileName = null;

        // Verifica se o arquivo da capa foi enviado
        if ($request->hasFile('albumCover')) {
            $coverFileName = $albumNameSlug . '_' . time() . '.' . $request->file('albumCover')->getClientOriginalExtension();
            $request->file('albumCover')->storeAs('public/' . $albumPath, $coverFileName);
        }

        // Verifica se o arquivo do fundo foi enviado
        if ($request->hasFile('albumBackground')) {
            $backgroundFileName = $albumNameSlug . '_' . time() . '.' . $request->file('albumBackground')->getClientOriginalExtension();
            $request->file('albumBackground')->storeAs('public/' . $albumPath, $backgroundFileName);
        }

        // Define os URLs de capa e fundo do álbum
        $coverUrl = $coverFileName ? 'storage/' . $albumPath . $coverFileName : $this->defaultImage; // Se não houver capa, use a imagem padrão
        $backgroundUrl = $backgroundFileName ? 'storage/' . $albumPath . $backgroundFileName : $this->defaultImage; // Se não houver fundo, use a imagem padrão

        // Cria o álbum no banco de dados
        $album = Album::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'cover_url' => $coverUrl,
            'background_url' => $backgroundUrl
        ]);

        return response()->json(['ok', 'album' => $album]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Album $album)
    {
        $album = $album->load("tracks");
        return response()->json($album);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Album $album)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album)
    {
        $album->delete();
        return response()->json(['ok'], 200);
    }
}
