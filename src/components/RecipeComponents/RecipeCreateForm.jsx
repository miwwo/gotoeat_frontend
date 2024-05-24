import React, { useEffect, useState } from 'react';
import {TextField, Button, FormControl, Checkbox, FormControlLabel} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { createRecipe, listIngredients} from "../../sevices/RecipeService"
import { useSelector } from "react-redux";
import "./RecipeCreateForm.css";
import { FaMinus } from "react-icons/fa";

const RecipeCreateForm = ({trigger, setTrigger, recipeCreateHandle}) => {
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
    }, []);

    useEffect(() => {
     setFormErrors({})
    }, [recipeToCreateIngredients]);
    const handleAddIngredient = () => {
        setRecipeToCreateIngredients([...recipeToCreateIngredients, { ingredient: null, quantity: '' , unit: ''}]);
    };

    const handleIngredientChange = (index, value) => {
        console.log(value)
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
            recipeToCreateIngredients.forEach(
                (recipeToCreateIngredient, index) => {
                if (!recipeToCreateIngredient.ingredient) {
                    isValid = false;
                    errors[`ingredient${index}`] = "Ingredient is required";
                }
                if (!recipeToCreateIngredient.quantity) {
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
            console.log("Validation failed");
            return;
        }
        const recipe = {
            name,
            description,
            visible,
            recipeIngredients: recipeToCreateIngredients.map(recipeToCreateIngredient => ({
                ingredient: { id: recipeToCreateIngredient.ingredient.id },
                quantity: recipeToCreateIngredient.quantity,
                unit: recipeToCreateIngredient.ingredient.unit
            }))
        };
        const response =  await createRecipe(token, recipe);
        if (response === "Рецепт успешно создан") {
            recipeCreateHandle(true);
            console.log("Рецепт успешно создан")
            setTrigger(false);
        } else {
            console.log("Error creating recipe");
        }
    };

    return trigger ? (
        <div className="popupForm">
            <div className="popupForm-inner">
                <button className="popupForm-close" onClick={() => setTrigger(false)}>Закрыть</button>
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
                        <div className="container p-0" key={index}
                             style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FormControl style={{ width: '40%', marginRight: '10px' }}>
                                <Autocomplete
                                    options={ingredients}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    onChange={(event, value) => handleIngredientChange(index, value)}
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
                                style={{ width: '10%', marginRight: '10px', marginTop:'16px'}}
                                error={!!formErrors[`quantity${index}`]}
                                helperText={formErrors[`quantity${index}`]}
                                inputProps={{ pattern: "[0-9]*" }}
                            />
                            {recipeToCreateIngredients[index].ingredient!==null&&<
                                p style={{marginBottom:'0px', marginTop:'30px', marginRight:'50px'}}>
                                {unitsHandle[recipeToCreateIngredients[index].ingredient.unit]}</p>}
                            <Button variant="contained" color="secondary"
                                    onClick={() => handleRemoveIngredient(index)}>
                                <FaMinus/>
                            </Button>
                        </div>
                    ))}
                    {formErrors.listIngredients && <p style={{ color: 'red'}}>{formErrors.listIngredients}</p>}

                    <Button variant="contained" color="primary" onClick={handleAddIngredient}>
                        Добавить ингредиент
                    </Button>
                    <br></br>
                    <FormControlLabel
                        control={<Checkbox checked={visible} onChange={() => setVisible(!visible)} />}
                        label="Публичный"
                    />
                    <br></br>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Создать рецепт
                    </Button>
                </div>
            </div>
        </div>
    ) : null;
};

export default RecipeCreateForm;
