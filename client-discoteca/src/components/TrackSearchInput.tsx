import React, { ChangeEvent } from 'react';
import { Input } from '@nextui-org/react';
import { IoIosSearch } from "react-icons/io";

type TrackSearchInputProps = {
    onChange: (searchTerm: string) => void;
};

const TrackSearchInput = ({ onChange }: TrackSearchInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <Input size='lg' color='primary' className='w-72' endContent={<IoIosSearch />} placeholder='Pesquisar música' onChange={handleChange} />
    );
};

export default TrackSearchInput;
