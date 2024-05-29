import React from 'react';
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./styles/RecipeWindow.css"; // Подключаем файл со стилями

const units = {
    "GRAM": "g",
    "MILLILITER": "ml",
    "PIECE": "psc"
};

const RecipeWindow = ({ recipe, addRecipeHandle }) => {
    return (
        <div className="recipe-window">
            <h5>Описание:</h5> <p>{recipe.description}</p>
            <h5>Ингредиенты:</h5>
            <ul>
                {recipe.recipeIngredients && recipe.recipeIngredients.map((recipeIngredient, index) => (
                    <li key={recipeIngredient.id}>
                        <p>Ингредиент: {recipeIngredient.ingredient.name}</p>
                        <p>Количество: {recipeIngredient.quantity} {units[recipeIngredient.ingredient.unit]}</p>
                        {index !== recipe.recipeIngredients.length - 1 && <hr className="ingredient-divider" />} {/* Вставляем разделитель между ингредиентами, кроме последнего */}
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
