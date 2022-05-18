import React from 'react';
import { useUsers , UsersList } from '../get-users';



export const HomePage = () => {
    const {users, isLoading: isLoadingUsers, setUsers } = useUsers();
//    const {ingredients, isLoading: isLoadingIngredients, setIngredients } = useIngredients();
    
    const onDeleteUser = async (id) => {
        const response = await fetch(`/users/${id}`, {method: 'delete'});
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
    }

    // const onDeleteIngredient = async (name) => {
    //     const response = await fetch(`/ingredients/${name}`, {method: 'delete'});
    //     const updatedIngredients = await response.json();
    //     setIngredients(updatedIngredients);
    // }

    return (
    <div className='page-container'>
        <div className='column'>
            
            <UsersList
                isLoading={isLoadingUsers}
                users={users}
                onDelete={onDeleteUser} />
        </div>
        {/* <div className='column'>
            <IngredientsList 
                isLoading={isLoadingIngredients}
                ingredients={ingredients}
                onDelete={onDeleteIngredient} />
           
        </div> */}
    </div>

);
}