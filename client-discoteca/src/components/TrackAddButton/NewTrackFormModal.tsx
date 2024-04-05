import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer } from '@nextui-org/react';
import { useForm, FormProvider } from 'react-hook-form';
import ImageInput from '../FileInput';
import { NewTrackFormData, Track } from '../../types';
import { trackSave } from '../../lib/axios';
import { ToastContainer, toast } from 'react-toastify'; import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/useAuth';
type NewTrackFormModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    albumId: string;
    onTrackAdded: (newTrack: Track) => void;
}

const NewTrackFormModal = ({ isOpen, onOpenChange, onClose, albumId, onTrackAdded }: NewTrackFormModalProps) => {
    const {token} = useAuth();
    const methods = useForm<NewTrackFormData>();

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset, setValue, getValues } = useForm<NewTrackFormData>({
        defaultValues: {
            albumId: albumId
        }
    });
    const onImageChange = (image: File) => {
        setValue('image', image);
    }
    const onSubmit = async () => {
        console.log(getValues());

        setValue('albumId', albumId)
        const newTrack = await trackSave(getValues(), token);
        onClose();
        setTimeout(() => {
            onTrackAdded(newTrack)
        }, 300);
        toast.success("Música adicionada com sucesso!");
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size='lg'
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Nova música</ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                <div className="text-center">
                                    <ImageInput required={false} name='image' text='Clique aqui para enviar a capa da música' onImageChange={onImageChange} />
                                    <Spacer y={1} />
                                    <span className="text text-gray-500">Imagem opcional. Usará capa do álbum se não adicionada.</span>
                                </div>

                                <Spacer y={5} />

                                <Input
                                    size='lg'
                                    autoFocus
                                    label="Nome"
                                    placeholder="Digite o nome da música"
                                    variant="bordered"
                                    {...register('name', { required: "O nome da música é obrigatório" })}
                                    errorMessage={errors.name && errors.name.message}
                                    isInvalid={errors.name ? true : false}
                                />
                                <Spacer y={5} />
                                <Input
                                    size='lg'
                                    label="Duração"
                                    description={"Digite no formato 00:00"}
                                    placeholder="Digite a duração da música"
                                    type="text"
                                    variant="bordered"
                                    maxLength={5}
                                    {...register('duration', { required: "Informe a duração da música", pattern: { value: /([0-9]{1,2}):([0-5][0-9])/, message: 'Digite no formato 00:00 !!' }, })}
                                    errorMessage={errors.duration && errors.duration.message}
                                    isInvalid={errors.duration ? true : false}
                                />

                            </form>
                        </FormProvider>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={() => { onClose(); reset() }}>
                            Cancelar
                        </Button>
                        <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
                            Salvar
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default NewTrackFormModal;
