import React, { useEffect, useState } from 'react';
import {getShoppingList, removeIngredientFromShoppingList} from "../../sevices/ShoppingListService";
import { useSelector } from 'react-redux';
import {FaMinus} from "react-icons/fa";

function CurrentShoppingList() {
    const { token } = useSelector((state) => state.user);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [recipeDeleted, setRecipeDeleted] = useState(false);

    const unitsHandle = {
        "GRAM": "г",
        "MILLILITER": "мл",
        "PIECE": "шт"
    }

    useEffect(() => {
        const fetchShoppingListData = async () => {
            try {
                const response = await getShoppingList(token);
                console.log(response);
                setSelectedRecipes(response.selectedRecipes);
                setShoppingList(response.shoppingListIngredients);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchShoppingListData();
    }, [token, recipeDeleted]);

    const handleRemoveRecipe = async (recipe_id) => {
        try {
            await removeIngredientFromShoppingList(token, recipe_id);
            setRecipeDeleted(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Список выбранных рецептов:</h2>
            {selectedRecipes.length===0 ? <p>У вас нет выбранных рецептов :С</p> :
                <div>
                {selectedRecipes.map((recipe, index) => (
                  <p key={index}> <button onClick={() => handleRemoveRecipe(recipe.id)}>{recipe.name}<FaMinus></FaMinus></button> </p>
                    ))}
                </div>}
            <h2>Список продуктов для покупки:</h2>
            {shoppingList.length===0 ? <p>У вас нет продуктов, которые нужно купить :С</p>:
            <ul>
                {shoppingList.map((item) => (
                    <li key={item.id}>
                        {item.ingredient.name} : {item.quantity} {unitsHandle[item.ingredient.unit]}
                    </li>
                ))}
            </ul>}
        </div>
    );
}

export default CurrentShoppingList;