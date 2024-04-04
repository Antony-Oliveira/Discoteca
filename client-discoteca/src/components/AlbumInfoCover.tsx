import { useEffect } from "react";
import { Album } from "../types";

interface AlbumInfoCoverProps  {
    album: Album;

}

const AlbumInfoCover = ({ album } : AlbumInfoCoverProps) => {

    return (
        <div
            className="relative bg-cover bg-center h-64 flex items-center justify-center object-cover"
            style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}/${album.background_url})`}}
        >
            <div className="absolute bottom-0 left-4 p-7 bottom-4 text-white">
                <h1 className="text-5xl font-bold">{album.name}</h1>
                <p className="mt-2 text-xl">{album.description}</p>
            </div>
        </div>
    )
}

export default AlbumInfoCover
