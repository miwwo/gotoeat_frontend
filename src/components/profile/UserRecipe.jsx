import React, {useEffect, useState} from 'react'
import {FaMinus, FaPlus} from "react-icons/fa";
import {addRecipeToShoppingList} from "../../sevices/ShoppingListService";
import {useSelector} from "react-redux";
import {getPersonalRecipes} from "../../sevices/UserService";
import RecipeForm from "../RecipeComponents/RecipeForm";
import {removeRecipe, updateRecipe} from "../../sevices/RecipeService";

function UserRecipe() {
    const { token } = useSelector((state) => state.user);

    const [userRecipes, setUserRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipePerPage] = useState(10);

    const [recipeCreateForm, setRecipeCreateForm] = useState(false);
    const [recipeUpdateForm, setRecipeUpdateForm] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null);

    const [recipeCreated, setRecipeCreated] = useState();
    const [recipeUpdated, setRecipeUpdated] = useState();
    const [recipeDeleted, setRecipeDeleted] = useState();

    const [searchQuery, setSearchQuery] = useState("");

    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonalRecipes = async () => {
            try {
                const response = await getPersonalRecipes(token);
                setUserRecipes(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setRecipeUpdateForm(false);
                setRecipeDeleted(false);
                setRecipeCreated(false);
                setRecipeToEdit(null)
            }
        };

        fetchPersonalRecipes();
    }, [recipeDeleted, recipeUpdated, recipeCreated, token]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecipes = userRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Загрузка...</div>;
    }

    const handleRecipeAdd = (recipe_id) => {
        addRecipeToShoppingList(token, recipe_id);
    }

    const handleRecipeUpdate = async (recipe) => {
        setRecipeToEdit(recipe);
        setRecipeUpdateForm(true);
    }

    const handleRecipeRemove = async (id) => {
        await removeRecipe(token, id);
        setRecipeDeleted(true);
    }

    const handleRecipeCreate = (isRecipeCreated) =>{
        setRecipeCreated(isRecipeCreated);
    }

    const handleRecipeUpdateComplete = (isRecipeUpdated) => {
        setRecipeUpdated(isRecipeUpdated);

    }

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(firstRecipeIndex, lastRecipeIndex);

    return (
        <div className="container">
            <button onClick={() => setRecipeCreateForm(true)}>Создать рецепт</button>
            <RecipeForm
                trigger={recipeCreateForm}
                setTrigger={setRecipeCreateForm}
                recipeCreateHandle={handleRecipeCreate}
                recipeToEdit={null}
            />
            <h1>Ваши рецепты:</h1>
            {userRecipes.length === 0 ? (
                <div>
                    <p>У вас еще нет рецептов! Создайте!</p>
                </div>
            ) : (
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Поиск по названию"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    {currentRecipes.map((recipe, index) => (
                        <div className="container" key={index}>
                            <div>
                                <h1>{recipe.name}</h1>
                                <p>Описание:{recipe.description}</p>
                                <button onClick={() => handleRecipeAdd(recipe.id)}><FaPlus /></button>
                                <button onClick={() => handleRecipeUpdate(recipe)}>Изменить</button>
                                <button onClick={() => handleRecipeRemove(recipe.id)}>Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <RecipeForm
                trigger={recipeUpdateForm}
                setTrigger={setRecipeUpdateForm}
                recipeUpdateHandle={handleRecipeUpdateComplete}
                recipeToEdit={recipeToEdit}
            />
        </div>
    )
}

export default UserRecipe;
