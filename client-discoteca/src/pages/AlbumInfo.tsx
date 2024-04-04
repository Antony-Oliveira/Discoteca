import { useState } from 'react';
import { Album, Track } from '../types';
import TrackAccordion from '../components/TrackAccordion';
import TrackAddButton from '../components/TrackAddButton';
import TrackSearchInput from '../components/TrackSearchInput';
import { Spacer } from '@nextui-org/spacer';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AlbumInfoCover from '../components/AlbumInfoCover';

const AlbumInfo = () => {
    const albumData: Album = useLoaderData();
    const [album, setAlbum] = useState<Album>(albumData);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleDeleteTrack = (trackId: string) => {
        setAlbum(prevAlbum => ({
            ...prevAlbum,
            tracks: prevAlbum.tracks.filter(track => track.id !== trackId)
        }));
    };

    const handleAddTrack = (newTrack: Track) => {
        setAlbum(prevAlbum => ({
            ...prevAlbum,
            tracks: [...prevAlbum.tracks, newTrack]
        }));
    };

    const handleSearchSubmit = (term: string) => {
        setSearchTerm(term);
    };

    const filteredTracks = album.tracks.filter(track =>
        track?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="">
            <Navbar />
            <AlbumInfoCover album={album}  />
            <div className="flex items-center justify-between mt-7 mx-5">
                <TrackAddButton albumId={album.id} onTrackAdded={handleAddTrack} />
                <Spacer x={3} />
                <TrackSearchInput onChange={handleSearchSubmit} />
            </div>

            <div className="mt-8">
                <TrackAccordion tracks={filteredTracks} onDeleteTrack={handleDeleteTrack} />
            </div>
        </div>
    );
};

export default AlbumInfo;
