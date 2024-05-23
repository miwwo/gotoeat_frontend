import React, {useEffect, useState} from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {listIngredients} from "../../sevices/RecipeService";
import {useSelector} from "react-redux";
import "./RecipeCreateForm.css";
function RecipeForm (props){
    const { token } = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);


    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await listIngredients(token)
                setIngredients(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchIngredients();
    }, []);

    const handleAddIngredient = () => {
        setRecipeIngredients([...recipeIngredients, { ingredient: null, quantity: '' }]);
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index].ingredient = value;
        setRecipeIngredients(updatedIngredients);
    };

    const handleQuantityChange = (index, value) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index].quantity = value;
        setRecipeIngredients(updatedIngredients);
    };

    /*const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };*/

    const validateInput = () => {
        let isValid = true;
        let errors = {};

        if (!name.trim()) {
            isValid = false;
            errors.name = "Name is required";   /////////////////////////////////
        }

        if (recipeIngredients.length === 0) {
            isValid = false;
            errors.listIngredients = "Ingredients are required";
        }else{
            recipeIngredients.forEach((recipeIngredient, index) => {
                if (!recipeIngredient.ingredient) {
                    isValid = false;
                    errors.listIngredientsNameEmpty = "Ingredient is required";
                }
                if (!recipeIngredient.quantity) {
                    isValid = false;
                    errors.listIngredientsQuantityEmpty = "Quantity is required";
                }
            });
        }

        setFormErrors(errors);

        return isValid;
    }

    const handleSubmit = () => {
        if (!validateInput()) {
            return;
        }
        const recipe = {
            name,
            description,
            ingredientsQuantity: recipeIngredients.map(recipeIngredient => ({
                ingredient: { id: recipeIngredient.ingredient.id },
                quantity: recipeIngredient.quantity
            }))
        };
        console.log(recipe);
        // Здесь отправляете ваш запрос с recipe
    };
    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (props.trigger) ? (
            <div className="popupForm">
                <div className="popupForm-inner">
                    <button className="popupForm-close" onClick={() => props.setTrigger(false)}>Закрыть</button>
                    <div>
                        <TextField
                            label="Название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
                        <TextField
                            label="Описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            margin="normal"
                        />
                        {recipeIngredients.map((ingredient, index) => (
                            <div key={index}>
                                <FormControl fullWidth margin="normal">
                                    <Autocomplete
                                        options={ingredients}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => handleIngredientChange(index, value)}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                       label="Ингредиент"
                                                       error={!!formErrors.listIngredientsNameEmpty}
                                                       helperText={formErrors.listIngredientsNameEmpty} />}
                                    />
                                </FormControl>
                                <TextField
                                    label="Количество"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    error={!!formErrors.listIngredientsNameEmpty}
                                    helperText={formErrors.listIngredientsNameEmpty}
                                />
                                {/*<Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleRemoveIngredient(index)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Удалить
                                </Button>*/}
                            </div>
                        ))}
                        <Button variant="contained" color="primary" onClick={handleAddIngredient}>
                            Добавить ингредиент
                        </Button>
                        {formErrors.listIngredients && <p>{formErrors.listIngredienst}</p>}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Создать рецепт
                        </Button>
                    </div>
                </div>
            </div>
    ) : "";
}

export default RecipeForm;
