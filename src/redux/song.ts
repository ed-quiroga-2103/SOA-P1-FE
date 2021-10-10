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
            localStorage.setItem('song', values.payload);

            state.name = values.payload;
        },
        setArtist: (state, values) => {
            localStorage.setItem('artist', values.payload);

            state.artist = values.payload;
        },
        setAlbum: (state, values) => {
            localStorage.setItem('album', values.payload);

            state.album = values.payload;
        },
        setLyrics: (state, values) => {
            localStorage.setItem('lyrics', values.payload);

            state.lyrics = values.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setName, setArtist, setAlbum, setLyrics } = slice.actions;

export const getName = (state: RootState) => {
    const name = localStorage.getItem('song');
    if (name) return name;
    return state.song.name;
};

export const getArtist = (state: RootState) => {
    const artist = localStorage.getItem('artist');
    if (artist) return artist;
    return state.song.artist;
};

export const getAlbum = (state: RootState) => {
    const album = localStorage.getItem('album');
    if (album) return album;
    return state.song.album;
};

export const getLyrics = (state: RootState) => {
    const lyrics = localStorage.getItem('lyrics');
    if (lyrics) return lyrics;
    return state.song.lyrics;
};

export default slice.reducer;
