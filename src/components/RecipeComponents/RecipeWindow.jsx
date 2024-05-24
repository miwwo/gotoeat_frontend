import React from 'react';


const units = {
    "GRAM": "g",
    "MILLILITER": "ml",
    "PIECE": "psc"
}
const RecipeWindow = ({ recipe }) => {

    return (
        <div>
            <h2>{recipe.name}</h2>
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
        </div>
    );
};

export default RecipeWindow;