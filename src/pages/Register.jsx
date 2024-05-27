import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../sevices/security/AuthService";
import "./styles/Register.css";

const Register = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const validateInput = () => {
        let isValid = true;
        let errors = {};

        if (!email.trim()) {
            isValid = false;
            errors.email = "Email необходимо заполнить";
        } else if (!email.includes('@')) {
            isValid = false;
            errors.email = "Email невалидный";
        }

        if (!password.trim()) {
            isValid = false;
            errors.password = "Пароль необходимо заполнить";
        } else if (password.length < 8) {
            isValid = false;
            errors.password = "Пароль должен быть не менее 8 символов";
        }

        setErrors(errors);

        return isValid;
    }

    const submit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            const content = await signUp(email, password);
            if (content.error)
                setErrMsg(content.error);
            else
                navigate('/login');
        }
    }

    return (
        <div className="form-signin">
            <form onSubmit={submit} className="register-form">
                <h1 className="h3 mb-3 fw-normal register-header">Регистрация</h1>
                <input type="email" className="form-control register-input" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)} />

                {errors.email && <p className="error">{errors.email}</p>}

                <input type="password" className="form-control register-input" placeholder="Пароль" required
                       onChange={e => setPassword(e.target.value)} />

                {errors.password && <p className="error">{errors.password}</p>}
                <button className="w-100 btn btn-lg btn-primary register-button" type="submit">Регистрация</button>
            </form>
            {errMsg && <p className="error">{errMsg}</p>}
            <p className="login-link">
                Уже есть аккаунт?&nbsp;
                <Link to="/login">Залогинься</Link>
            </p>
        </div>
    );
};

export default Register;
