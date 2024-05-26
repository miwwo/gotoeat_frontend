import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    roles: [],
    token: null,
    status: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.roles = action.payload.roles;
            state.token = action.payload.token;
            state.status = action.payload.status;
        },
        removeUser: (state) => {
            state.email = null;
            state.roles = [];
            state.token = null;
            state.status = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;