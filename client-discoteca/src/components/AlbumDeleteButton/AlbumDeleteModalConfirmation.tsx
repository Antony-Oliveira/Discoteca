import { ModalContent, ModalFooter, ModalHeader, Button, ModalBody, Modal } from '@nextui-org/react'
import React, { useState } from 'react'
import { albumDelete } from '../../lib/axios';
import { useAuth } from '../hooks/useAuth';

interface ModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    albumName: string;
    albumId: string;
    onClose: () => void;
    onDeleteAlbum: (albumId: string) => void;
}

const AlbumDeleteModalConfirmation = ({ isOpen, onOpenChange, albumName, albumId, onClose, onDeleteAlbum }: ModalProps) => {
    const {token} = useAuth();
    const [loading, setIsLoading] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlePress = async () => {
        setIsLoading(true);
        await albumDelete(albumId, token);
        setIsLoading(false);
        onClose();
        setTimeout(() => {
            onDeleteAlbum(albumId)
        }, 500);
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirmar exclusão de música</ModalHeader>
                        <ModalBody>
                            <p>
                                Deseja realmente excluir a música {albumName} da discoteca?
                            </p>
                            <p>Essa ação não poderá ser desfeita...</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={async () => await handlePress()} isLoading={loading}>
                                Excluir
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Fechar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}


export default AlbumDeleteModalConfirmation;
