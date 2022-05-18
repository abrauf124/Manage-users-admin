import React from "react";
import { Link } from "react-router-dom";
import {SmallX} from '../ui';
import { MdEdit } from "react-icons/md";

export const UsersListItem = ({user, onDelete}) => (
    <div className="list-item">    
            <>
            <h3>{user.userName}</h3>
            <p>{user.email}</p>
            <p>{user.phoneNum}</p>
            <div className="right-action">
                <Link to={'/update-user'} state={{ user }}>
                    <button ><MdEdit /></button>
                </Link>
            </div>
            <div className="right-action">
                <SmallX onClick= {() => onDelete(user._id)} />
            </div>
            </>
    </div>
);