import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { MdOutlineAudiotrack } from "react-icons/md";
import NewTrackFormModal from './NewAlbumFormModal';
import { Album } from '../../types';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

interface AlbumAddButtonProps  {
    onAlbumAdded: (album : Album) => void;
}

const AlbumAddButton = ({onAlbumAdded} : AlbumAddButtonProps) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { user } = useAuth();
    const handleOpen = () => {
        if(user){
            onOpen();
        }else{
            toast.error("Faça login para criar albuns!");
        }
    }
  return (
    <div>
        <Button className='text-white' size='lg' color="success" startContent={<MdOutlineAudiotrack/>} onPress={handleOpen}>
        Adicionar album
      </Button>
      <NewTrackFormModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}  onAlbumAdded={onAlbumAdded}/>
    </div>
  )
}

export default AlbumAddButton;
