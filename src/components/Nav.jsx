import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser} from "../store/slices/userSlice";

const Nav = (props) => {
    const dispatch = useDispatch();

    const logout = async () => {
        dispatch(removeUser());
    }

    let nav_bar;

    if (props.email === null) {
        nav_bar = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        nav_bar = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {(props.roles.includes('ROLE_ADMIN')) &&
                    <li className="nav-item active">
                        <Link to="/admin" className="nav-link">Панель администратора</Link>
                    </li>
                }
                <li className="nav-item active">
                    <Link to="/profile/recipes" className="nav-link">Мои рецепты</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/shopping-list" className="nav-link">Мой лист покупок</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={logout}>{props.email} Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    {nav_bar}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
