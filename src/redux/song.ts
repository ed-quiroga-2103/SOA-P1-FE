import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'song',
    initialState: {
        name: 'Holder name',
        artist: 'Holder artist',
        album: 'Holder album',
        lyrics: '[00:01:00]This\n[00:02:00]are\n[00:03:00]lyrics\n[00:04:00]from\n[00:05:00]a\n[00:06:00]song',
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
