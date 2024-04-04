import { Card, CardBody, CardHeader, Image, Button, CardFooter, Spacer } from '@nextui-org/react';
import { Album } from '../types';
import { Link } from 'react-router-dom';
import AlbumDeleteButton from './AlbumDeleteButton';

interface AlbumCardProps {
    album: Album;
    onAlbumDelete: (albumId: string) => void;
}
const AlbumCard = ({ album, onAlbumDelete }: AlbumCardProps) => {

    return (
        <Card className="py-4 w-full" style={{ backgroundColor: '#333333', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold" style={{ color: '#FFFFFF' }}>{(new Date(album.created_at)).toLocaleDateString('pt-BR') }</p>
                <small className="text-default-500" style={{ color: '#CCCCCC' }}>{`${album.tracks?.length || 0} músicas`}</small>
                <h4 className="font-bold text-large" style={{ color: '#FFFFFF' }}>{album.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-8 px-8 flex items-center justify-center">
                <Image
                    alt="Capa do Álbum"
                    className="object-fill  w-80 h-62"
                    src={`${import.meta.env.VITE_API_URL}/${album.cover_url}`}
                />
            </CardBody>

            <CardFooter className="flex justify-end">
                <AlbumDeleteButton albumId={album.id} albumName={album.name} onDeleteAlbum={onAlbumDelete} />
                <Spacer />
                <Button
                    color="secondary"
                    className="mt-4"
                    as={Link}
                    to={`/album/${album.id}`}
                >
                    Mais informações
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AlbumCard;
