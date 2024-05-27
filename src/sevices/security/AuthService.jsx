import axios from "axios";


const REST_API_BASE_URL='http://90.156.230.41:8080/auth';


export const signUp = async (email, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: REST_API_BASE_URL + '/signup',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                email,
                password
            })
        });

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

export const login = async (email, password) => {
    try{
        const response = await axios({
            method: 'post',
            url: REST_API_BASE_URL + '/login',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                email,
                password
            })
        });
        return response.data;
    } catch (e) {
        if (e.response && e.response.status === 401) {
            // This is an authentication error
            return {error: 'Invalid username or password', status: e.response.status};
        } else if (e.response) {
            // Some other kind of error
            return {error: e.response.data, status: e.response.status};
        } else if (e.request) {
            // The request was made but no response was received
            return {error: 'No response from server', status: 0};
        } else {
            // Something happened in setting up the request that triggered an Error
            return {error: e.message, status: 0};
        }

    }
}



