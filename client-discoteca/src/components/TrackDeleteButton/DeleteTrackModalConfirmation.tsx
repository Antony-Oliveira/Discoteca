import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { trackDelete } from '../../lib/axios';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

interface ModalConfirmationProps {
    isOpen: boolean;
    onOpenChange: () => void;
    trackName: string;
    trackId: string;
    onClose: () => void;
    onDeleteTrack: (trackId : string) => void;
}

const DeleteTrackModalConfirmation = ({isOpen, onOpenChange, trackName, trackId, onClose, onDeleteTrack} : ModalConfirmationProps) => {
    const {token} = useAuth();
    const [loading, setIsLoading] = useState<boolean>(false);
    const handlePress = async () => {
        setIsLoading(true);
        await trackDelete(trackId, token);
        setIsLoading(false);
        toast.success("Música deletada com sucesso.")
        onClose();
        setTimeout(() => {
            onDeleteTrack(trackId)
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
                                Deseja realmente excluir a música {trackName} do album?
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

export default DeleteTrackModalConfirmation
