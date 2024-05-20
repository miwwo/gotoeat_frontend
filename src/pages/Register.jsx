import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {signUp} from "../sevices/AuthService";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const navigate = useNavigate();

    const validateInput = () => {
        let isValid = true;
        let errors = {};

        if (!username.trim()) {
            isValid = false;
            errors.username = "Username is required";
        }

        if (!password.trim()) {
            isValid = false;
            errors.password = "Password is required";
        } else if (password.length < 6) {
            isValid = false;
            errors.password = "Password must be at least 6 characters";
        }

        setErrors(errors);

        return isValid;
    }
    const submit = async (e) => {
        e.preventDefault();
        if(validateInput()){
            const content = await signUp(username, password);
            if (content.error)
                setErrMsg(content.error);
            else
                navigate('/login');
    }}



    return (
        <>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>
                <input type="username" className="form-control" placeholder="Username" required
                       onChange={e => setUsername(e.target.value)}/>
                {errors.username && <p className="error">{errors.username}</p>}
                <input type="password" className="form-control" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            {errMsg && <p className="error">{errMsg}</p>}
            <p>
                Have an account?
                <Link to="/register">Log in</Link>
            </p>
        </>

    );
};

export default Register;
