import React, { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ImageInputProps {
    onImageChange: (file : File) => void;
    name: string;
    text: string;
    required: boolean;
}

const ImageInput = ({onImageChange, name, text, required = true} : ImageInputProps) => {
    const { register, setValue, formState: { errors } } = useFormContext();
    const [hasImage, setHasImage] = useState(false);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            console.log(e.target.value);

            setValue(name, file);
            onImageChange(file);
            setHasImage(true);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <label htmlFor={name} className="cursor-pointer border-2 border-gray-300 rounded-md p-2 hover:bg-gray-100">
                <input
                    id={name}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register(name, { ...(required && { required: "Não se esqueça da imagem!" }), onChange: (e) => handleFileChange(e) })}
                />
                <label htmlFor={name} className="text-gray-700">{hasImage ? "Imagem pronta :)" : text}</label>
            </label>
            {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
        </div>
    );
};

export default ImageInput;
