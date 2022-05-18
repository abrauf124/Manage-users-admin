import React from 'react';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { AddUserPage } from './add-user';
import { UpdateUserPage } from './update-user';


const routes=[{
    path:'/',
    Component: HomePage,
    exact: true,
},{
    path: '/add-user',
    Component: AddUserPage,
},{
    path: '/update-user',
    Component:UpdateUserPage,
}];

export const Routing = () => {
    return (
        <Router>
            <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={ <route.Component />}
                />   
            ))}
            </Routes>
        </Router>
    );
}