// components/RecipePanel.js
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import RecipeForm from './RecipeForm';
import { listRecipesByUser, updateRecipe} from '../../../sevices/RecipeService';
import { useSelector } from "react-redux";
import Pagination from "../../../pages/Pagination";

const RecipePanel = ({ userId, handleBack }) => {
    const { token } = useSelector((state) => state.user);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipePerPage] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const fetchRecipes = async () => {
            const data = await listRecipesByUser(token, userId);
            setRecipes(data);
        };
        fetchRecipes();
    }, [token, userId,recipes]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(firstRecipeIndex, lastRecipeIndex);

    const handleEditClick = (recipe) => {
        setSelectedRecipe(recipe);
        setIsFormOpen(true);
    };

    const handleSubmit = async (recipe) => {
        if (recipe.id) {
            const updatedRecipe = await updateRecipe(token, recipe);
            setRecipes(prevRecipes => prevRecipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
        }
        setIsFormOpen(false);
    };

    const handleClose = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="default" onClick={handleBack} style={{ marginLeft: '10px' }}>
                К пользователям
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentRecipes.map((recipe) => (
                        <TableRow key={recipe.id}>
                            <TableCell>{recipe.id}</TableCell>
                            <TableCell>{recipe.name}</TableCell>
                            <TableCell>{recipe.description}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleEditClick(recipe)}>
                                    Обновить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isFormOpen} onClose={handleClose}>
                <DialogTitle>{'Обновить рецепт'}</DialogTitle>
                <DialogContent>
                    <RecipeForm
                        recipe={selectedRecipe}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </Dialog>
            <Pagination totalRecord={filteredRecipes.length}
                        recordPerPage={recipesPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}/>
        </div>
    );
};

export default RecipePanel;
