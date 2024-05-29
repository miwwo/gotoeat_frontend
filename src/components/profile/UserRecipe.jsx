import React, { useEffect, useState } from 'react';
import { addRecipeToShoppingList } from '../../sevices/ShoppingListService';
import { useSelector } from 'react-redux';
import { getPersonalRecipes } from '../../sevices/UserService';
import RecipeForm from '../RecipeComponents/RecipeForm';
import { removeRecipe } from '../../sevices/RecipeService';
import Pagination from '../../pages/Pagination';
import Recipe from '../RecipeComponents/Recipe';
import { Button } from 'react-bootstrap';
import './styles/UserRecipe.css';
function UserRecipe() {
    const { token } = useSelector((state) => state.user);

    const [userRecipes, setUserRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipePerPage] = useState(10);

    const [recipeCreateForm, setRecipeCreateForm] = useState(false);
    const [recipeUpdateForm, setRecipeUpdateForm] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null);

    const [recipeCreated, setRecipeCreated] = useState(false);
    const [recipeUpdated, setRecipeUpdated] = useState(false);
    const [recipeDeleted, setRecipeDeleted] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonalRecipes = async () => {
            try {
                const response = await getPersonalRecipes(token);
                setUserRecipes(response);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
                setRecipeUpdateForm(false);
                setRecipeDeleted(false);
                setRecipeCreated(false);
                setRecipeToEdit(null);
            }
        };

        fetchPersonalRecipes();
    }, [recipeDeleted, recipeUpdated, recipeCreated, token]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecipes = userRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Загрузка...</div>;
    }

    const handleRecipeAdd = (recipe_id) => {
        addRecipeToShoppingList(token, recipe_id);
    };

    const handleRecipeUpdate = (recipe) => {
        setRecipeToEdit(recipe);
        setRecipeUpdateForm(true);
    };

    const handleRecipeRemove = async (id) => {
        await removeRecipe(token, id);
        setRecipeDeleted(true);
    };

    const handleRecipeCreate = (isRecipeCreated) => {
        setRecipeCreated(isRecipeCreated);
    };

    const handleRecipeUpdateComplete = (isRecipeUpdated) => {
        setRecipeUpdated(isRecipeUpdated);
    };

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(firstRecipeIndex, lastRecipeIndex);

    return (
        <div className="container">
            <Button style={{background:'rosybrown',borderColor:'rosybrown', color:'wheat'}} onClick={() => setRecipeCreateForm(true)} className="mb-3">
                Создать рецепт
            </Button>
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
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по названию"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="row">
                        {currentRecipes.map((recipe, index) => (
                            <div className="col-md-6 mb-4" key={index}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <Recipe
                                            recipe={recipe}
                                            addRecipeHandle={handleRecipeAdd}
                                            recipeControl={
                                                <div className="d-flex justify-content-between">
                                                    <Button style={{background:'wheat',borderColor:'wheat', color:'darkgoldenrod'}} className="me-2" size="sm" onClick={() => handleRecipeUpdate(recipe)}>
                                                        Изменить
                                                    </Button>
                                                    <Button style={{background:'indianred',borderColor:'indianred', color:'white'}} size="sm" onClick={() => handleRecipeRemove(recipe.id)}>
                                                        Удалить
                                                    </Button>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <RecipeForm
                trigger={recipeUpdateForm}
                setTrigger={setRecipeUpdateForm}
                recipeUpdateHandle={handleRecipeUpdateComplete}
                recipeToEdit={recipeToEdit}
            />
            <Pagination
                totalRecord={filteredRecipes.length}
                recordPerPage={recipesPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}

export default UserRecipe;
