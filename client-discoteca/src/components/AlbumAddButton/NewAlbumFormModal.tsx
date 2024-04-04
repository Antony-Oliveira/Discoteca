import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, Textarea } from '@nextui-org/react';
import { useForm, FormProvider } from 'react-hook-form';
import ImageInput from '../FileInput';
import { Album, NewAlbumFormData } from '../../types';
import { albumSave } from '../../lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
type NewAlbumFormProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    onAlbumAdded: (newAlbum: Album) => void;
}

const NewTrackFormModal = ({ isOpen, onOpenChange, onClose, onAlbumAdded }: NewAlbumFormProps) => {
    const { token } = useAuth();
    const methods = useForm<NewAlbumFormData>();

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset, setValue, getValues } = useForm<NewAlbumFormData>();

    const onCoverImageChange = (image: File) => {
        setValue('albumCover', image);
    }
    const onBackgroundImageChange = (image: File) => {
        setValue('albumBackground', image);
    }


    const onSubmit = async () => {

        const newAlbum = await albumSave(getValues(), token);
        onClose();
        toast('Album criado com sucesso!', {
            position: "bottom-right",
            autoClose: 2500,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success"
        });
        setTimeout(() => {
            onAlbumAdded(newAlbum)
        }, 300);

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
                    <ModalHeader className="flex flex-col gap-1">Novo album</ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                <ImageInput text='Clique para adicionar a capa do album' name='albumCover' onImageChange={onCoverImageChange} required={true} />
                                <Spacer y={5} />

                                <ImageInput text='Clique para adicionar a capa da página do album' name='albumBackground' onImageChange={onBackgroundImageChange} required={true} />
                                <Spacer y={5} />

                                <Input
                                    size='lg'
                                    autoFocus
                                    label="Nome"
                                    placeholder="Digite o nome do album"
                                    variant="bordered"
                                    {...register('name', { required: "O nome do album é obrigatório" })}
                                    errorMessage={errors.name && errors.name.message}
                                    isInvalid={errors.name ? true : false}
                                />
                                <Spacer y={5} />
                                <Textarea
                                    size='lg'
                                    label="Descrição"
                                    placeholder="Digite algo sobre o album"
                                    type="text"
                                    variant="bordered"
                                    {...register('description', { required: "Diga algo sobre o album!" })}
                                    errorMessage={errors.description && errors.description.message}
                                    isInvalid={errors.description ? true : false}
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
