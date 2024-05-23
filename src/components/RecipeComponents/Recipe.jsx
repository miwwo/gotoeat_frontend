import React from 'react';


const units = {
    "GRAM": "g",
    "MILLILITER": "ml",
    "PIECE": "psc"
}
const Recipe = ({ recipe }) => {

    function handleClick() {

    }

    return (
        <div onClick={handleClick}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
        </div>
    );
};

export default Recipe;
