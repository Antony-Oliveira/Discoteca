import { useEffect, useState } from 'react';
import { Album } from '../types';
import { getAlbums } from '../lib/axios';
import AlbumCard from './AlbumCard';
import AlbumSearchInput from './AlbumSearchInput';
import AlbumAddButton from './AlbumAddButton';
import { Spacer } from '@nextui-org/react';

function AlbumArea() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const albumData = await getAlbums();
            setAlbums(albumData);
        };
        fetchData();
    }, []);

    const filteredAlbums = Array.isArray(albums) ? albums.filter(album =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleDeleteAlbum = (albumId: string) => {
        setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumId));
    };

    const handleAddAlbum = (album: Album) => {
        setAlbums(prevAlbums => [...prevAlbums, album]);
    };

    return (
        <div>
            <p className='text-4xl text-center font-bold mt-3'>Albums</p>
            <div className="flex flex-col items-center mt-5">
                <AlbumSearchInput onChange={handleSearchChange} />
                <Spacer y={5} />
                <AlbumAddButton onAlbumAdded={handleAddAlbum} />
            </div>

            <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 mx-5">
                {filteredAlbums.map(album => (
                    <div key={album.id} className="w-full sm:w-auto my-3">
                        <AlbumCard album={album} onAlbumDelete={handleDeleteAlbum} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlbumArea;
