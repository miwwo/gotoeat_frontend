import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080';

export const listRecipes = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: REST_API_BASE_URL + "/recipes",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Made listRecipes request")
        return response.data;
    } catch (e) {
        if (e.response) {
            return { error: e.response.data, status: e.response.status };
        } else if (e.request) {
            return { error: 'No response from server', status: 0 };
        } else {
            return { error: e.message, status: 0 };
        }
    }
};
export const listIngredients = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: REST_API_BASE_URL + "/ingredients",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Made ListIngredients request")
        return response.data;
    } catch (e) {
        if (e.response) {
            return { error: e.response.data, status: e.response.status };
        } else if (e.request) {
            return { error: 'No response from server', status: 0 };
        } else {
            return { error: e.message, status: 0 };
        }
    }
};

