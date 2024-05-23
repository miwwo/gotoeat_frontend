import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    role: [],
    token: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
        removeUser: (state) => {
            state.email = null;
            state.role = [];
            state.token = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;