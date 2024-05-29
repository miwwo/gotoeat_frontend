import React, { useEffect, useState } from 'react';
import {TextField, Button, FormControl, Checkbox, FormControlLabel} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {createRecipe, listIngredients, updateRecipe} from "../../sevices/RecipeService";
import { useSelector } from "react-redux";
import "./styles/RecipeCreateForm.css";
import { FaMinus } from "react-icons/fa";

const RecipeForm = ({trigger, setTrigger, recipeCreateHandle, recipeToEdit, recipeUpdateHandle}) => {
    const { token } = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [recipeToCreateIngredients, setRecipeToCreateIngredients] = useState([]);
    const [visible, setVisible] = useState(false);

    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const unitsHandle = {
        "GRAM": "г",
        "MILLILITER": "мл",
        "PIECE": "шт"
    }

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await listIngredients(token);
                setIngredients(response);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchIngredients();
    }, [token]);

    useEffect(() => {
        setFormErrors({});
    }, [recipeToCreateIngredients]);

    useEffect(() => {
        if (recipeToEdit!=null) {
            setName(recipeToEdit.name);
            setDescription(recipeToEdit.description);
            setRecipeToCreateIngredients(recipeToEdit.recipeIngredients.map(ri => ({
                ingredient: { id: ri.ingredient.id, name: ri.ingredient.name, unit: ri.ingredient.unit },
                quantity: ri.quantity
            })));
            setVisible(recipeToEdit.visible);
        } else {
            setName('');
            setDescription('');
            setRecipeToCreateIngredients([]);
            setVisible(false);
        }
    }, [trigger]);

    const handleAddIngredient = () => {
        setRecipeToCreateIngredients([...recipeToCreateIngredients, { ingredient: null, quantity: '' , unit: '' }]);
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...recipeToCreateIngredients];
        updatedIngredients[index].ingredient = value;
        setRecipeToCreateIngredients(updatedIngredients);
    };

    const handleQuantityChange = (index, value) => {
        const updatedIngredients = [...recipeToCreateIngredients];
        updatedIngredients[index].quantity = value;
        setRecipeToCreateIngredients(updatedIngredients);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...recipeToCreateIngredients];
        updatedIngredients.splice(index, 1);
        setRecipeToCreateIngredients(updatedIngredients);
    };

    const validateInput = () => {
        let isValid = true;
        let errors = {};

        if (!name.trim()) {
            isValid = false;
            errors.name = "Name is required";
        }

        if (recipeToCreateIngredients.length === 0) {
            isValid = false;
            errors.listIngredients = "Ingredients are required";
        } else {
            recipeToCreateIngredients.forEach((ingredient, index) => {
                if (!ingredient.ingredient) {
                    isValid = false;
                    errors[`ingredient${index}`] = "Ingredient is required";
                }
                if (!ingredient.quantity) {
                    isValid = false;
                    errors[`quantity${index}`] = "Quantity is required";
                }
            });
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        if (!validateInput()) {
            return;
        }
        const recipe = {
            name,
            description,
            visible,
            recipeIngredients: recipeToCreateIngredients.map(ingredient => ({
                ingredient: { id: ingredient.ingredient.id },
                quantity: ingredient.quantity,
                unit: ingredient.ingredient.unit
            }))
        };
        const response = await createRecipe(token, recipe);
        if (response === "Рецепт успешно создан") {
            recipeCreateHandle(true);
            setTrigger(false);
        } else {
            console.log("Error creating recipe");
        }
    };

    const handleUpdateSubmit = async (e) => {
        if (!validateInput()) {
            return;
        }

        const recipe = {
            id: recipeToEdit.id,
            name,
            description,
            visible,
            recipeIngredients: recipeToCreateIngredients.map(ingredient => ({
                ingredient: { id: ingredient.ingredient.id },
                quantity: ingredient.quantity,
                unit: ingredient.ingredient.unit
            }))
        };
        console.log(recipe);
        const response = await updateRecipe(token, recipe);
        if (response === "Рецепт успешно обновлен") {
            recipeUpdateHandle(true);
            setTrigger(false);
        } else {
            console.log("Возникла ошибка при обновлении");
        }
        recipeUpdateHandle(true);
    }

    return trigger ? (
        <div className="popupForm">
            <div className="popupForm-inner">
                <button className="popupForm-close rounded" style={{background:'slategrey',borderColor:'slategrey', color:'white'}} onClick={() => setTrigger(false)}>Закрыть</button>
                <div>
                    <TextField style={{ width: '40%', marginRight: '10px' }}
                               label="Название"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
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
                    {recipeToCreateIngredients.map((ingredient, index) => (
                        <div className="container p-0" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FormControl style={{ width: '40%', marginRight: '10px' }}>
                                <Autocomplete
                                    options={ingredients}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    onChange={(event, value) => handleIngredientChange(index, value)}
                                    value={ingredient.ingredient || null}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Ингредиент"
                                            error={!!formErrors[`ingredient${index}`]}
                                            helperText={formErrors[`ingredient${index}`]}
                                        />
                                    )}
                                />
                            </FormControl>
                            <TextField
                                value={ingredient.quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        handleQuantityChange(index, value);
                                    }
                                }}
                                style={{ width: '10%', marginRight: '10px', marginTop: '16px' }}
                                error={!!formErrors[`quantity${index}`]}
                                helperText={formErrors[`quantity${index}`]}
                                inputProps={{ pattern: "[0-9]*" }}
                            />
                            {ingredient.ingredient && (
                                <p style={{ marginBottom: '0px', marginTop: '30px', marginRight: '50px' }}>
                                    {unitsHandle[ingredient.ingredient.unit]}
                                </p>
                            )}
                            <Button style={{background:'red', color:'white'}} onClick={() => handleRemoveIngredient(index)}>
                                <FaMinus />
                            </Button>
                        </div>
                    ))}
                    {formErrors.listIngredients && <p style={{ color: 'red'}}>{formErrors.listIngredients}</p>}

                    <Button style={{background:'seagreen',color:'white'}} onClick={handleAddIngredient}>
                        Добавить ингредиент
                    </Button>
                    <br></br>
                    <FormControlLabel
                        control={<Checkbox checked={visible} onChange={() => setVisible(!visible)} />}
                        label="Публичный"
                    />
                    <br></br>
                    {recipeToEdit ? (
                        <Button style={{background:'seagreen', color:'white'}} onClick={handleUpdateSubmit}>
                            Изменить рецепт
                        </Button>
                    ) : (
                        <Button style={{background:'seagreen', color:'white'}} onClick={handleSubmit}>
                            Создать рецепт
                        </Button>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default RecipeForm;
