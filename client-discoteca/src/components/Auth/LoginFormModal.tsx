import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from 'react-hook-form';
import { handleSignIn } from '../../lib/axios';
import { useAuth } from '../hooks/useAuth';


const LoginFormModal = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const { login } = useAuth();
    const toggleVisibility = () => setIsVisible(!isVisible);


    const { handleSubmit, formState: { isSubmitting }, register } = useForm();

    const onSubmit = async (data: { email: string, password: string }) => {
        const res = await handleSignIn(data, { login });
        if (res) {
            onClose()
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    return (
        <>
            <Button onPress={onOpen} color="primary" variant='flat'>Login</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                            <ModalBody>
                                <form>
                                    <Input
                                        autoFocus
                                        endContent={
                                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-1" />
                                        }
                                        label="Email"
                                        placeholder="Digite seu email"
                                        variant="bordered"
                                        {...register('email', { required: 'Email obrigatório' })}
                                    />
                                    <Spacer y={3} />
                                    <Input
                                        label="Senha"
                                        variant="bordered"
                                        placeholder="Digite sua senha"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <LuEye className="text-2xl text-default-400 pointer-events-none mb-1" />
                                                ) : (
                                                    <LuEyeOff className="text-2xl text-default-400 pointer-events-none mb-1" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        {...register('password', { required: 'Senha obrigatória' })}
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" isLoading={isSubmitting} onPress={handleSubmit(onSubmit)}>
                                    Logar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default LoginFormModal;
