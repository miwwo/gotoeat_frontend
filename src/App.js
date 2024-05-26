import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import {useSelector} from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import CurrentShoppingList from "../src/components/profile/CurrentShoppingList";
import UserRecipe from "./components/profile/UserRecipe";
import AdminRoute from "./components/AdminComponents/AdminRoute";
import AdminPanel from "./components/AdminComponents/AdminPanel";

function App() {
    const user = useSelector(state => state.user);

    return (
        <div className="App">
            <BrowserRouter>
                <Nav email={user.email} setEmail={user.email} roles={user.roles}/>

                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Home email={user.email}/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/shopping-list"
                            element={
                                <PrivateRoute>
                                    <CurrentShoppingList/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile/recipes"
                            element={
                                <PrivateRoute>
                                    <UserRecipe/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminPanel/>
                            </AdminRoute>
                            }
                        />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;