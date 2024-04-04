import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../../types';
import { handleSignUp } from '../../lib/axios';
import { useAuth } from '../hooks/useAuth';


const RegisterModalForm = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const { register, formState: { errors, isSubmitting }, handleSubmit, reset, clearErrors } = useForm<RegisterFormData>({
    });
    const { login } = useAuth();
    const onSubmit = async (data: RegisterFormData) => {
        const res = await handleSignUp(data, { login: login });
        if(res) {
            onClose();
            window.location.reload();

        }
    }

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <>
            <p className='text-white cursor-pointer' onClick={onOpen} color="primary" >Registro</p>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registro</ModalHeader>

                            <ModalBody>
                                <form action="POST">
                                    <Input
                                        autoFocus
                                        endContent={
                                            <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-1" />
                                        }
                                        label="Nome"
                                        placeholder="Digite seu nome"
                                        variant="bordered"
                                        {...register('name', { required: "O nome é obrigatório" })}
                                        errorMessage={errors.name && errors.name.message}
                                        isInvalid={errors.name ? true : false}
                                    />
                                    <Spacer y={3} />
                                    <Input
                                        autoFocus
                                        endContent={
                                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-1" />
                                        }
                                        label="Email"
                                        placeholder="Digite seu email"
                                        variant="bordered"
                                        {...register('email',
                                            {
                                                required: "O email é obrigatório",
                                                pattern: {
                                                    value:/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                                    message: "Digite o email corretamente"
                                                }
                                            }
                                        )}
                                        errorMessage={errors.email && errors.email.message}
                                        isInvalid={errors.email ? true : false}
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
                                        {...register('password', { required: "A senha é obrigatória"})}
                                        errorMessage={errors.password && errors.password.message}
                                        isInvalid={errors.password ? true : false}
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => { reset() ; clearErrors() ; onClose()}}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting}>
                                    Registrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default RegisterModalForm;

