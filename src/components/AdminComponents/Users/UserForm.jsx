// components/UserForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

const UserForm = ({ user, handleSubmit, handleClose }) => {
    const [formState, setFormState] = useState({
        id: user ? user.id : null,
        name: user ? user.name : '',
        email: user ? user.email : '',
    });

    useEffect(() => {
        if (user) {
            setFormState({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formState);
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
                {user ? 'Update' : 'Add'} User
            </Button>
            <Button onClick={handleClose} color="secondary" variant="contained" fullWidth style={{ marginTop: '10px' }}>
                Cancel
            </Button>
        </form>
    );
};

export default UserForm;
