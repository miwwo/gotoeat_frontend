import React, {useEffect, useState} from 'react'
import {FaMinus, FaPlus} from "react-icons/fa";
import {addRecipeToShoppingList} from "../../sevices/ShoppingListService";
import {useSelector} from "react-redux";
import {getPersonalRecipes} from "../../sevices/UserService";

function UserRecipe() {
    const { token } = useSelector((state) => state.user)

    const [userRecipe, setUserRecipe] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchPesonalRecipes = async () => {
            try {
                const response = await getPersonalRecipes(token)
                setUserRecipe(response);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPesonalRecipes();
    }, []);
    const handleRecipeAdd = (recipe_id) => {
        addRecipeToShoppingList(token, recipe_id);
    }

    return (
        <div className="container">
            <h1>Ваши рецепты:</h1>
            {userRecipe.length===0 ? <p>У вас еще нет рецептов! Создайте!</p> :
                <div>
                    {userRecipe.map((recipe, index) => (
                        <div className="container" key={index}>
                            <p>
                                <p>{recipe.name}</p>
                                <p>{recipe.description}</p>
                                <button onClick={() => handleRecipeAdd(recipe.id)}><FaPlus></FaPlus></button>
                            </p>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default UserRecipe
