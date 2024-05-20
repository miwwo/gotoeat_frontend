import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: null,
    role: null,
    token: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
        removeUser: (state) => {
            state.username = null;
            state.role = null;
            state.token = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;