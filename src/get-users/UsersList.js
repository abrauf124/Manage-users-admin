import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import tableIcons from "../MaterialTableIcons";
import { useNavigate } from 'react-router-dom';

export const UsersList =  ({ isLoading, users, onDelete}) => {
    const navigate = useNavigate();
      const columns = [
          { title: "Name", field: "userName" },
          { title: "Email", field: "email" },
          { title: "Mobile Number", field: "phoneNum" },
          
        ];
      const [data, setData] =useState([]);
      const handleDelete = (rowUser) =>{
       if( window.confirm("Are you sure you want to delete the user permanently? : " + rowUser.userName.toUpperCase())){
           onDelete(rowUser._id)
       }

      };
  
      useEffect(() =>{
          setData(users);
          
      },[users]);
    
    return(
        <div className="list-container">
        <h1>All Users</h1>
        <div className="list-container">
        <Link to="/add-user">
                <button className='create-user-button list-container full-width'>
                   Create new user
                </button>
        </Link>
       </div>
        {isLoading
            ? <p>Loading...</p>
            :<MaterialTable 
                title="User Table" 
                icons={tableIcons} 
                columns={columns} 
                data={data} 
                pageSize={12}  
                rowsPerPageOptions={[5]}
                actions={[
                    {
                      icon: tableIcons.Edit,
                      tooltip: 'Edit User',
                      onClick: (event, user) => {
                        navigate('/update-user', {state: {user}})
                      }
                    },
                    {
                        icon: tableIcons.Delete,
                        tooltip: 'Delete User',
                        onClick: (event, user) => handleDelete( user)
                        
                    }
                  ]}
                  options={{
                    actionsColumnIndex: -1
                  }}/>
            // : users.map((user, index) =>{
                //     return (
                    //         <UsersListItem
                    //             key={index}
                    //             user={user}
                    //             onDelete={onDelete} />
                    //     );
                    // })
        }
    </div>
 );
  };