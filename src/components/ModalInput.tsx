import React from 'react';
import { Field, Input } from '@chakra-ui/react';

interface ModalInputProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalInput: React.FC<ModalInputProps> = ({ label, value, onChange, type }) => {
    return (
        <Field.Root>
            <Field.Label>
                {label}
            </Field.Label>
            <Input type={type} value={value} onChange={onChange} />
        </Field.Root>
    );
};

export default ModalInput;
