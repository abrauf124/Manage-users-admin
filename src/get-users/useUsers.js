import { useState, useEffect } from 'react';

export const useUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rawUsers, setRawUsers] = useState([]);

    const loadUsers = async () => {
        setIsLoading(true);
        const response = await fetch('/users');
        const rawUsersResponse = await response.json();
        console.log(rawUsersResponse);
        setRawUsers(rawUsersResponse);
        setIsLoading(false);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return {
        isLoading,
        users: rawUsers.map(user => ({
            ...user,
        })),
        setUsers: setRawUsers,
    };
}