import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
    const user = useSelector(state => state.user);
    return user.token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;