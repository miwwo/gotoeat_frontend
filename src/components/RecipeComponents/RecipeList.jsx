import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import {listRecipes} from "../../sevices/RecipeService";
import {useSelector} from "react-redux";
import RecipeForm from "./RecipeForm";
import Pagination from "../../pages/Pagination";
import {addRecipeToShoppingList} from "../../sevices/ShoppingListService";

const RecipeList = () => {
    const { token } = useSelector((state) => state.user);

    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipePerPage] = useState(10);

    const [recipeCreateForm, setRecipeCreateForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [recipeCreated, setRecipeCreated] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await listRecipes(token)
                setRecipes(response);
                setRecipeCreated(false);
            } catch (error) {
                setError(error.message);
            }finally {
                setLoading(false)
            }
        }

        fetchRecipes();
    }, [token, recipeCreated]);


    const handleRecipeCreate = (isRecipeCreated) =>{
        setRecipeCreated(isRecipeCreated);
    }

    const handleRecipeAdd = (recipe_id) => {
        addRecipeToShoppingList(token, recipe_id);
    }


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(firstRecipeIndex, lastRecipeIndex);

    return (
        <div className="container">
            <button onClick={() => {setRecipeCreateForm(true); }}>Создать рецепт</button>
            <RecipeForm
                trigger = {recipeCreateForm}
                setTrigger={setRecipeCreateForm}
                recipeCreateHandle={handleRecipeCreate}>
                recipeToEdit={null}
            </RecipeForm>
            <div className="container mt-4">
                <div className="row">
                    <h1>Список рецептов</h1>
                    <input
                        type="text"
                        placeholder="Поиск рецептов"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="form-control mb-4"
                    />
                        <div className="container mt-4">
                            <div className="row">
                            {currentRecipes.map(recipe => (
                                <div className="col-md-6 mb-4" key={recipe.id}>
                                    <Recipe recipe={recipe} addRecipeHandle={handleRecipeAdd} />
                                </div>
                            ))}
                                <Pagination totalRecord={filteredRecipes.length}
                                            recordPerPage={recipesPerPage}
                                            setCurrentPage={setCurrentPage}
                                            currentPage={currentPage}/>
                            </div>

                         </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeList;
