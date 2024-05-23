import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import {useSelector} from "react-redux";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const user = useSelector(state => state.user);

    return (
        <div className="App">
            <BrowserRouter>
                <Nav email={user.email} setEmail={user.email}/>

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
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;