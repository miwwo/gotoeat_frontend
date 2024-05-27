import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import RecipeWindow from './RecipeWindow'; // Импорт компонента с полной информацией о рецепте
import './Recipe.css';

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
            <Card className="h-100 recipe-card">
                <Card.Body>
                    <Card.Title className="mt-2">{recipe.name}</Card.Title>
                    <p>{recipe.description}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={(e) => { e.stopPropagation(); addRecipeHandle(recipe.id); }} variant="outline-secondary" className="me-2 btn-sm">
                            <FaPlus /> Добавить
                        </Button>
                        <Button style={{background:'cadetblue',borderColor:'cadetblue', color:'white'}} onClick={handleClick} className="btn btn-primary btn-sm me-md-2">
                            Подробнее
                        </Button>
                        {recipeControl}
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{recipe.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeWindow recipe={recipe} addRecipeHandle={addRecipeHandle} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Recipe;
