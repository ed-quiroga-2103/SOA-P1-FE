import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'song',
    initialState: {
        name: '',
        artist: '',
        album: '',
        lyrics: '',
    },
    reducers: {
        setName: (state, values) => {
            state.name = values.payload;
        },
        setArtist: (state, values) => {
            state.artist = values.payload;
        },
        setAlbum: (state, values) => {
            state.album = values.payload;
        },
        setLyrics: (state, values) => {
            state.lyrics = values.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setName, setArtist, setAlbum, setLyrics } = slice.actions;

export const getName = (state: RootState) => state.song.name;
export const getArtist = (state: RootState) => state.song.artist;
export const getAlbum = (state: RootState) => state.song.album;
export const getLyrics = (state: RootState) => state.song.lyrics;

export default slice.reducer;
