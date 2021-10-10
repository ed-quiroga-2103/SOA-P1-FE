import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        id: '',
        premium: false,
    },
    reducers: {
        setName: (state, values) => {
            localStorage.setItem('name', values.payload);
            state.name = values.payload;
        },
        setLastname: (state, values) => {
            localStorage.setItem('lastname', values.payload);

            state.lastname = values.payload;
        },
        setUsername: (state, values) => {
            localStorage.setItem('username', values.payload);

            state.username = values.payload;
        },
        setEmail: (state, values) => {
            localStorage.setItem('email', values.payload);

            state.email = values.payload;
        },
        setId: (state, values) => {
            localStorage.setItem('id', values.payload);

            state.email = values.payload;
        },
        setPremium: (state, values) => {
            console.log(values.payload);
            localStorage.setItem('premium', values.payload);

            state.premium = values.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setName,
    setLastname,
    setUsername,
    setEmail,
    setId,
    setPremium,
} = slice.actions;

export const getName = (state: RootState) => {
    const name = localStorage.getItem('name');
    if (name) return name;
    return state.user.name;
};
export const getLastname = (state: RootState) => {
    const lastname = localStorage.getItem('lastname');
    if (lastname) return lastname;
    return state.user.lastname;
};
export const getUsername = (state: RootState) => {
    const username = localStorage.getItem('username');
    if (username) return username;
    return state.user.username;
};
export const getEmail = (state: RootState) => {
    const email = localStorage.getItem('email');
    if (email) return email;
    return state.user.email;
};
export const getId = (state: RootState) => {
    const id = localStorage.getItem('id');
    if (id) return id;
    return state.user.id;
};
export const getPremium = (state: RootState) => {
    const premium = localStorage.getItem('premium');
    if (premium) return premium;
    return state.user.premium;
};

export default slice.reducer;
