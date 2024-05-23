import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {login} from "../sevices/AuthService";
import AuthContext from "../context/AuthProvider";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import "../App.css";

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {setAuth} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const submit = async (e) => {
        e.preventDefault();

        const content = await login(username, password);
        console.log(content);
        if (content.error) {
            setErrMsg(content.error);
        } else {
            dispatch(setUser({
                username: username,
                token: content.accessToken,
                role: content.role,
            }));
            navigate('/');
            const accessToken = content.accessToken;
            const role = content.role;
            setAuth({username, password, accessToken,role});
            navigate('/');
        }
    }

    return (
        <div className="form-signin">
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="text" className="form-control" placeholder="Username" value={username} required
                   onChange={e => setUsername(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" value={password} required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
            {errMsg && <p className="error">{errMsg}</p>}
            <p>
                Not registered yet?
                <Link to="/register">Register</Link>
            </p>
        </div>

    );
};

export default Login;
