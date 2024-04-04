import React from 'react'
import { Button, useDisclosure } from '@nextui-org/react'
import AlbumDeleteModalConfirmation from './AlbumDeleteModalConfirmation';
import { useAuth } from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
interface AlbumDeleteButtonProps {
    albumId: string;
    albumName: string;
    onDeleteAlbum: (albumId: string) => void;
}

const AlbumDeleteButton = ({ albumId, albumName, onDeleteAlbum} : AlbumDeleteButtonProps) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { user } = useAuth()
    const handleOpen = () => {
        if(user) {
            onOpen();
        }else{
            toast.error("Faça login para excluir albuns!");
        }
    }
    return (
        <div>
            <Button
                color="danger"
                className="mt-4"
                onPress={handleOpen}
            >
                Excluir
            </Button>
            <AlbumDeleteModalConfirmation albumId={albumId} albumName={albumName} onDeleteAlbum={onDeleteAlbum} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
        </div>
    )
}

export default AlbumDeleteButton
