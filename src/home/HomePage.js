import React from 'react';
import { useUsers , UsersList } from '../get-users';



export const HomePage = () => {
    const {users, isLoading: isLoadingUsers, setUsers } = useUsers();

    
    const onDeleteUser = async (id) => {
        const response = await fetch(`/users/${id}`, {method: 'delete'});
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
    }
    return (
    <div className='page-container'>
        <div className='column'>
            
            <UsersList
                isLoading={isLoadingUsers}
                users={users}
                onDelete={onDeleteUser} />
        </div>
    </div>

);
}