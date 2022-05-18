import React from 'react';
import { MdDelete } from "react-icons/md";

export const SmallX = ({ onClick }) => (
    <div className="small-x">
        <span className="the-x" onClick={onClick}><MdDelete /></span>
    </div>
);