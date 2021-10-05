
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        lastname: '',
        username: '',
        email: '',
    },
    reducers: {
        setName: (state, values) => {
            state.name = values.payload;
        },
        setLastname: (state, values) => {
            state.lastname = values.payload;
        },
        setUsername: (state, values) => {
            state.username = values.payload;
        },
        setEmail: (state, values) => {
            state.email = values.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setName, setLastname, setUsername, setEmail } = slice.actions;

export const getName = (state: RootState) => state.user.name;
export const getLastname = (state: RootState) => state.user.lastname;
export const getUsername = (state: RootState) => state.user.username;
export const getEmail = (state: RootState) => state.user.email;

export default slice.reducer;