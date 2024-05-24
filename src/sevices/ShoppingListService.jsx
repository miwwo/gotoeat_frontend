import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080';

export const getShoppingList = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: REST_API_BASE_URL + "/shopping-list",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Made personal shoppingList request")
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
export const addRecipeToShoppingList = async (token, id) => {
    try {
        const response = await axios({
            method: 'post',
            url: REST_API_BASE_URL + "/shopping-list/add-recipe/" + id,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Added recipe with id " + id + " to shoppingList")
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

export const removeIngredientFromShoppingList = async (token, id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: REST_API_BASE_URL + "/shopping-list/remove-recipe/" + id,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Removed recipe with id" + id + " from shoppingList")
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
}
export const completeShoppingList = async (token) => {
    try {
        const response = await axios({
            method: 'put',
            url: REST_API_BASE_URL + "/shopping-list/complete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Completed shoppingList")
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
}