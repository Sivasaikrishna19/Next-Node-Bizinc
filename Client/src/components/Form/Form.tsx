import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

interface FormProps {
    onSubmit: (userData: any) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | undefined>(undefined);
    const [gender, setGender] = useState<string>();
    const [occupation, setOccupation] = useState<string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAgeChange = (value: number | undefined) => {
        setAge(value);
    };

    const handleGenderChange = (value: string) => {
        setGender(value);
    };

    const handleOccupationChange = (value: string) => {
        setOccupation(value);
    };

    const handleSubmit = () => {
        onSubmit({ name, age, gender, occupation });
        setName('');
        setAge(undefined);
        setGender('');
        setOccupation('');
    };

    return (
        <div className='mt-4'>
            <div className='flex'>
                <div className='w-1/2'>
                    <label htmlFor='name'>Name:</label>
                    <Input id='name' placeholder='Enter your name' value={name} onChange={handleNameChange} />
                </div>
                <div className='w-1/2 ml-2'>
                    <label htmlFor='age'>Age:</label>
                    <Input type='number' id='age' placeholder='Enter your age' value={age} onChange={(e) => handleAgeChange(parseInt(e.target.value, 10))} />
                </div>
            </div>
            <div className='flex  mt-4'>
                <div className='w-1/2'>
                    <label htmlFor='gender'>Gender:</label>
                    <Select id='gender' placeholder='Select your gender' value={gender} onChange={handleGenderChange} className='w-full'>
                        <Option value='male'>Male</Option>
                        <Option value='female'>Female</Option>
                        <Option value='other'>Other</Option>
                    </Select>
                </div>
                <div className='w-1/2 ml-2' >
                    <label htmlFor='occupation'>Occupation:</label>
                    <Input id='occupation' placeholder='Enter your occupation' value={occupation} onChange={(e) => handleOccupationChange(e.target.value)} />
                </div>
            </div>
            <Button type='primary' className='mt-4' onClick={handleSubmit}>
                Add User
            </Button>
        </div>
    );
};

export default Form;
