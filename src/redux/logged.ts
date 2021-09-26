import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'logged',
    initialState: {
        value: false,
    },
    reducers: {
        login: (state) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = slice.actions;

export const isLogged = (state: RootState) => state.logged.value;

export default slice.reducer;
