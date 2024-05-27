import React, { useEffect, useState } from 'react';
import { getShoppingList, removeIngredientFromShoppingList } from "../../sevices/ShoppingListService";
import { useSelector } from 'react-redux';
import { FaMinus } from "react-icons/fa";
import "./ShoppingList.css";
import { Button, Modal } from "react-bootstrap";
import RecipeWindow from "../RecipeComponents/RecipeWindow"; // Импорт файла со стилями

function CurrentShoppingList() {
    const { token } = useSelector((state) => state.user);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [recipeDeleted, setRecipeDeleted] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    const unitsHandle = {
        "GRAM": "г",
        "MILLILITER": "мл",
        "PIECE": "шт"
    }

    useEffect(() => {
        const fetchShoppingListData = async () => {
            try {
                const response = await getShoppingList(token);
                setSelectedRecipes(response.selectedRecipes);
                setShoppingList(response.shoppingListIngredients);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchShoppingListData();
    }, [token, recipeDeleted]);

    const handleClick = (recipe) => {
        setCurrentRecipe(recipe);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentRecipe(null);
    };

    const handleRemoveRecipe = async (recipe_id) => {
        try {
            await removeIngredientFromShoppingList(token, recipe_id);
            setRecipeDeleted(prev => !prev);
            handleClose();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Список выбранных рецептов:</h2>
            {selectedRecipes.length === 0 ?  <p className="empty-message">У вас нет выбранных рецептов :С</p> :
                <div className="recipe-list">
                    {selectedRecipes.map((recipe, index) => (
                        <button key={index} onClick={() => handleClick(recipe)}>
                            {recipe.name}
                        </button>
                    ))}
                </div>
            }
            <h2>Список продуктов для покупки:</h2>
            <ul className="shopping-list">
                {shoppingList.length === 0 ? (
                    <p className="empty-message">У вас нет продуктов, которые нужно купить :С</p>
                ) : (
                    shoppingList.map((item, index) => (
                        <li key={index} className="shopping-list-item">
                            <span className="item-name">{item.ingredient.name}</span>:
                            <span className="item-quantity">{item.quantity}</span>
                            <span className="item-unit">{unitsHandle[item.ingredient.unit]}</span>
                        </li>
                    ))
                )}
            </ul>

            {currentRecipe && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentRecipe.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RecipeWindow recipe={currentRecipe} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{background:'indianred', borderColor:'indianred'}} onClick={() => handleRemoveRecipe(currentRecipe.id)}>Удалить из списка</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default CurrentShoppingList;
