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
                {recipe.ingredientsQuantity && recipe.ingredientsQuantity.map(ingredientQuantity => (
                    <li key={ingredientQuantity.id}>
                        <p>Ингредиент: {ingredientQuantity.ingredient.name}</p>
                        <p>Количество: {ingredientQuantity.quantity} {units[ingredientQuantity.ingredient.unit]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeWindow;