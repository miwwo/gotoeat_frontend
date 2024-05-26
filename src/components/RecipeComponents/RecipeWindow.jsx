import React from 'react';
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";

const units = {
    "GRAM": "g",
    "MILLILITER": "ml",
    "PIECE": "psc"
};

const RecipeWindow = ({ recipe, addRecipeHandle }) => {
    return (
        <div>
            <p>{recipe.description}</p>
            <h3>Ингредиенты:</h3>
            <ul>
                {recipe.recipeIngredients && recipe.recipeIngredients.map(recipeIngredient => (
                    <li key={recipeIngredient.id}>
                        <p>Ингредиент: {recipeIngredient.ingredient.name}</p>
                        <p>Количество: {recipeIngredient.quantity} {units[recipeIngredient.ingredient.unit]}</p>
                    </li>
                ))}
            </ul>
            <Button onClick={() => addRecipeHandle(recipe.id)} variant="outline-secondary" className="me-2">
                <FaPlus />
            </Button>
        </div>
    );
};

export default RecipeWindow;
