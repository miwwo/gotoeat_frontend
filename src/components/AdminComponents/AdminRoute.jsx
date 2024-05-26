import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({children}) => {
    const user = useSelector(state => state.user);
    if (user.token && user.roles.includes('ROLE_ADMIN')) {
        return <>{children}</>;
    }
    else
        return <Navigate to="/login" />;
};

export default AdminRoute;