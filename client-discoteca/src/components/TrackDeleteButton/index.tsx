import { Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteTrackModalConfirmation from "./DeleteTrackModalConfirmation";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

interface TrackDeleteButtonProps {
    trackId: string;
    trackName: string;
    onDeleteTrack: (trackId: string) => void;
}

export const TrackDeleteButton = ({ trackId, trackName, onDeleteTrack }: TrackDeleteButtonProps) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { user } = useAuth();

    const handleOpen = () => {
        if(user){
            onOpen();
        }else{
            toast.error("Faça login para excluir músicas!");
        }
    }
    return (
        <div>
            <Button onClick={handleOpen} startContent={<AiOutlineDelete />} color="danger" >
                Deletar
            </Button>
            <DeleteTrackModalConfirmation onDeleteTrack={onDeleteTrack} isOpen={isOpen} onOpenChange={onOpenChange} trackName={trackName} trackId={trackId} onClose={onClose} />
        </div>
    )
}
