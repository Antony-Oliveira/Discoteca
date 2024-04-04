import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { MdOutlineAudiotrack } from "react-icons/md";
import NewTrackFormModal from './NewTrackFormModal';
import { Track } from '../../types';
import { useAuth } from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

interface TrackAddButtonProps  {
    albumId: string;
    onTrackAdded: (track : Track) => void;
}

const TrackAddButton = ({albumId, onTrackAdded} : TrackAddButtonProps) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { user } = useAuth();

    const handleOpen = () => {
        if(user){
            onOpen();
        }else{
            toast.error("Faça login para poder adicionar músicas!");
        }
    }
  return (
    <div>
        <Button className='text-white' size='lg' color="success" startContent={<MdOutlineAudiotrack/>} onPress={handleOpen}>
        Adicionar música
      </Button>
      <NewTrackFormModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} albumId={albumId} onTrackAdded={onTrackAdded}/>
    </div>
  )
}

export default TrackAddButton;
