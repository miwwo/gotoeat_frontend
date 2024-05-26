import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    roles: [],
    token: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.roles = action.payload.roles;
            state.token = action.payload.token;
        },
        removeUser: (state) => {
            state.email = null;
            state.roles = [];
            state.token = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;