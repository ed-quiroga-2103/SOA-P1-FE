import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'song',
    initialState: {
        songName: '',
        artist: '',
        album: '',
        lyrics: '',
        _id: '',
    },
    reducers: {
        setSongName: (state, values) => {
            localStorage.setItem('song', values.payload);

            state.songName = values.payload;
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
        setSongId: (state, values) => {
            localStorage.setItem('songId', values.payload);

            state.lyrics = values.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSongName, setArtist, setAlbum, setLyrics, setSongId } =
    slice.actions;

export const getSongName = (state: RootState) => {
    const name = localStorage.getItem('song');
    if (name) return name;
    return state.song.songName;
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

export const getSongId = (state: RootState) => {
    const id = localStorage.getItem('songId');
    if (id) return id;
    return state.song._id;
};

export default slice.reducer;
