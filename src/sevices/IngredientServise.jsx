// services/IngredientService.js
import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080';

export const listIngredients = async (token) => {
    const response = await axios.get(`${REST_API_BASE_URL}/ingredients`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createIngredient = async (token, ingredient) => {
    const response = await axios.post(`${REST_API_BASE_URL}/ingredients`, ingredient, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateIngredient = async (token, ingredient) => {
    const response = await axios.put(`${REST_API_BASE_URL}/ingredients/${ingredient.id}`, ingredient, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteIngredient = async (token, id) => {
    const response = await axios.delete(`${REST_API_BASE_URL}/ingredients/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
