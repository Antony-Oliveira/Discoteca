// AlbumSearchInput.jsx
import React from 'react';
import { Input } from '@nextui-org/react';
import { IoIosSearch } from "react-icons/io";

type AlbumSearchInputProps = {
    onChange: (searchTerm: string) => void;
};

const AlbumSearchInput = ({ onChange }: AlbumSearchInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <Input className=' w-96' size='lg' color='primary' placeholder='Pesquisar album' endContent={<IoIosSearch />} onChange={handleChange} />
    );
};

export default AlbumSearchInput;
