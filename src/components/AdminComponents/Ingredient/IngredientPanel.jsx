// components/IngredientPanel.js
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import IngredientForm from './IngredientForm';
import { listIngredients, createIngredient, updateIngredient, deleteIngredient } from '../../../sevices/IngredientServise';
import { useSelector } from "react-redux";

const IngredientPanel = () => {
    const { token } = useSelector((state) => state.user);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const fetchIngredients = async () => {
            const data = await listIngredients(token);
            setIngredients(data);
        };
        fetchIngredients();
    }, [token]);

    const handleAddClick = () => {
        setSelectedIngredient(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (ingredient) => {
        setSelectedIngredient(ingredient);
        setIsFormOpen(true);
    };

    const handleDeleteClick = async (id) => {
        await deleteIngredient(token, id);
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
    };

    const handleSubmit = async (ingredient) => {
        if (ingredient.id) {
            const updatedIngredient = await updateIngredient(token, ingredient);
            setIngredients(prevIngredients => prevIngredients.map(i => i.id === updatedIngredient.id ? updatedIngredient : i));
        } else {
            const newIngredient = await createIngredient(token, ingredient);
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        }
        setIsFormOpen(false);
    };

    const handleClose = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleAddClick}>
                Add Ingredient
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                            <TableCell>{ingredient.id}</TableCell>
                            <TableCell>{ingredient.name}</TableCell>
                            <TableCell>{ingredient.unit}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleEditClick(ingredient)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(ingredient.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isFormOpen} onClose={handleClose}>
                <DialogTitle>{selectedIngredient ? 'Edit Ingredient' : 'Add Ingredient'}</DialogTitle>
                <DialogContent>
                    <IngredientForm
                        ingredient={selectedIngredient}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IngredientPanel;
