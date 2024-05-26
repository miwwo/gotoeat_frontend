import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FaPlus, FaHeart } from 'react-icons/fa';
import RecipeWindow from './RecipeWindow'; // Импорт компонента с полной информацией о рецепте

const units = {
    "GRAM": "g",
    "MILLILITER": "ml",
    "PIECE": "psc"
};

const Recipe = ({ recipe, addRecipeHandle, recipeControl }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <Card className="h-100" onClick={handleClick}>
                <Card.Body>
                    <Card.Title className="mt-2">{recipe.name}</Card.Title>
                    <p>{recipe.description}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={(e) => { e.stopPropagation(); addRecipeHandle(recipe.id); }} variant="outline-secondary" className="me-2">
                            <FaPlus />
                        </Button>
                    </div>
                    {recipeControl}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{recipe.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeWindow recipe={recipe} addRecipeHandle={addRecipeHandle} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Recipe;
