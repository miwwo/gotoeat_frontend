// components/RecipeForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

const RecipeForm = ({ recipe, handleSubmit, handleClose }) => {
    const [formState, setFormState] = useState({
        id: recipe ? recipe.id : null,
        name: recipe ? recipe.name : '',
        description: recipe ? recipe.description : ''
    });

    useEffect(() => {
        if (recipe) {
            setFormState({
                id: recipe.id,
                name: recipe.name,
                description: recipe.description
            });
        }
    }, [recipe]);

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
                label="имя"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Описание"
                name="description"
                value={formState.description}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
                {recipe ? 'Обновить' : 'Создать'} рецепт
            </Button>
            <Button onClick={handleClose} color="secondary" variant="contained" fullWidth style={{ marginTop: '10px' }}>
                Отмена
            </Button>
        </form>
    );
};

export default RecipeForm;
