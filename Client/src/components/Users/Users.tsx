import React, { useEffect } from 'react';
import { List, Button } from 'antd';
import Link from 'next/link';

interface UsersProps {
    users: any[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
    useEffect(() => { console.log(users, "users") }, [users])
    return (
        <div className='mt-4'>
            <div className='text-lg font-semibold'>User List</div>
            <List
                dataSource={users}
                renderItem={(user: any, index: number) => (
                    <List.Item key={index}>
                        <div>
                            <strong>Name:</strong> {user.name}
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
                        <Link href={`/Profile/${user.userId}`}>
                            <Button type='primary' className='mt-2'>
                                View Profile
                            </Button>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Users;
