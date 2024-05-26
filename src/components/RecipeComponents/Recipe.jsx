import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaPlus, FaHeart } from 'react-icons/fa';

const units = {
    "GRAM": "g",
    "MILLILITER": "ml",
    "PIECE": "psc"
}
const Recipe = ({ recipe, addRecipeHandle }) => {

    function handleClick() {

    }

    /*return (
        <div onClick={handleClick}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
        </div>
    );*/
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="mt-2">{recipe.name}</Card.Title>
                <p>{recipe.description}</p>
                <div className="d-flex justify-content-end">
                    <Button onClick={()=> addRecipeHandle(recipe.id)} variant="outline-secondary" className="me-2">
                        <FaPlus />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );

};

export default Recipe;
