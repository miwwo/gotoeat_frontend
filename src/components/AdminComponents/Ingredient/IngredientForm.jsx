// components/IngredientForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@material-ui/core';

const IngredientForm = ({ ingredient, handleSubmit, handleClose }) => {
    const [formState, setFormState] = useState({
        id: ingredient ? ingredient.id : null,
        name: ingredient ? ingredient.name : '',
        unit: ingredient ? ingredient.unit : ''
    });

    const units = ["GRAM", "MILLILITER", "PIECE"];

    useEffect(() => {
        if (ingredient) {
            setFormState({
                id: ingredient.id,
                name: ingredient.name,
                unit: ingredient.unit
            });
        }
    }, [ingredient]);

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
                select
                label="Unit"
                name="unit"
                value={formState.unit}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            >
                {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                        {unit}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" color="primary" variant="contained" fullWidth>
                {ingredient ? 'Update' : 'Add'} Ingredient
            </Button>
            <Button onClick={handleClose} color="secondary" variant="contained" fullWidth style={{ marginTop: '10px' }}>
                Cancel
            </Button>
        </form>
    );
};

export default IngredientForm;
