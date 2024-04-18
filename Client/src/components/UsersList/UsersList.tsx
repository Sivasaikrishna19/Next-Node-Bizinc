import React, { useEffect, useState } from 'react';
import { List, Button, Modal } from 'antd';
import Link from 'next/link';
import axios from 'axios'; // Import Axios
import { BASE_URL } from '~/env';

interface UsersProps {
    users: any[];
    setUsers: any;
}

const Users = ({ users, setUsers }: UsersProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string>('')
    const getUsers = () => {
        axios
            .get(BASE_URL + "users")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(BASE_URL + `users/${userId}`).then((res) => {
                getUsers()
            });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const showDeleteModal = (id: string) => {
        setSelectedUser(id)
        setIsDeleteModalOpen(true);
    };

    const handleDeleteOk = () => {
        deleteUser(selectedUser);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div className='mt-4'>
            <div className='text-lg font-semibold'>User List</div>
            <List
                dataSource={users}
                renderItem={(user: any, index: number) => (
                    <List.Item key={index}>
                        <div>
                            <strong>Name:</strong> {user.name.length > 8 ? user.name.substring(0, 8) + "..." : user.name}
                        </div>
                        <div>
                            <strong>Age:</strong> {user.age}
                        </div>
                        <div>
                            <strong>Gender:</strong> {user.gender}
                        </div>
                        <div>
                            <strong>Occupation:</strong> {user.occupation}
                        </div>
                        <div className='flex items-center'>
                            <Link href={`/Profile/${user.id}`}>
                                <Button className='ml-2' type='primary'>View Profile</Button>
                            </Link>
                            <Button className='ml-2'
                                onClick={() => showDeleteModal(user.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </List.Item>
                )}
            />
            <Modal open={isDeleteModalOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel} okText="Delete">
                Are you sure to delete the user?
            </Modal>
        </div>
    );
};

export default Users;
