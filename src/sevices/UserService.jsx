import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080';

export const getPersonalRecipes= async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: REST_API_BASE_URL + "/profile/recipes",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Made personal list of recipes request")
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

export const listUsers = async (token) => {
    const response = await axios.get(`${REST_API_BASE_URL}/admin/users`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateUser = async (token, user) => {
    const response = await axios.put(`${REST_API_BASE_URL}/admin/users/${user.id}` , user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const banUser = async (token, user) => {
    const response = await axios.put(`${REST_API_BASE_URL}/admin/users/${user.id}/ban` , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const unbanUser = async (token, user) => {
    const response = await axios.put(`${REST_API_BASE_URL}/admin/users/${user.id}/unban` , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
