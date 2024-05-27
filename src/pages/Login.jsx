import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../sevices/security/AuthService";
import AuthContext from "../context/AuthProvider";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import "./styles/Login.css"; // Обновленный путь к CSS файлу
import { parseJwt } from "../context/tokenUtils";

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const submit = async (e) => {
        e.preventDefault();

        const content = await login(email, password);
        console.log(content);
        if (content.error) {
            setErrMsg(content.error);
        } else {
            const decodedToken = parseJwt(content.accessToken);
            const accessToken = content.accessToken;
            const roles = decodedToken.roles;
            const status = decodedToken.status;
            console.log(email + " " + accessToken + " " + roles + " " + status)
            dispatch(setUser({
                email: email,
                token: accessToken,
                roles: roles,
                status: status
            }));
            setAuth({ email, password, accessToken, roles, status });
            navigate('/');
        }
    }

    return (
        <div className="form-signin">
            <form onSubmit={submit} className="login-form">
                <h1 className="h3 mb-3 fw-normal login-header">Вход в аккаунт</h1>
                <input type="text" className="form-control login-input" placeholder="Email" value={email} required
                       onChange={e => setEmail(e.target.value)}/>
                <input type="password" className="form-control login-input" placeholder="Пароль" value={password} required
                       onChange={e => setPassword(e.target.value)}/>
                <button className="w-100 btn btn-lg btn-primary login-button" type="submit">Войти</button>
            </form>
            {errMsg && <p className="error">{errMsg}</p>}
            <p className="register-link">
                Еще не зарегистрирован?&nbsp;
                <Link to="/register">Зарегистрироваться</Link>
            </p>
        </div>

    );
};

export default Login;
