import React from "react";
import {UsersListItem} from './UsersListItem';
import { Link } from 'react-router-dom';


export const UsersList = ({ isLoading, users, onDelete}) => {
      const columns = [
          { title: "Name", field: "userName" },
          { title: "Email", field: "email" },
          { title: "Mobile Number", field: "phoneNum" },
        ];
      
        const data = [
          { userName: "Mohammad", email: "Faisal@email.com", phoneNum: 199554894845 },
          { userName: "Naveen", email: "aisa@email.com", phoneNum: 199554894845 },
        ];
    return(
        <div className="list-container">
       
        <h1>All Users</h1>
        <div className="list-container">
        <Link to="/add-user">
                <button className='shopping-list-button list-container full-width'>
                   Create new user
                </button>
        </Link>
       </div>
        {isLoading
            ? <p>Loading...</p>
            : users.map((user, index) =>{
                return (
                    <UsersListItem
                        key={index}
                        user={user}
                        onDelete={onDelete} />
                );
            })}
    </div>
 );
  };