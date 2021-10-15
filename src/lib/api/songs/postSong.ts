import axios from 'axios';
import config from '../../../config';
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();

const postSong = async (body: {
    name: string;
    artist: string;
    album: string;
    lyrics: string;
}, file : string) => {
    const response = await axios
        .post(`${config.API_URL}/songs`, body)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        }) as any;
    data.append('song',file);
    data.append('id',response.id);
    const upload = await axios
    .post(`${config.API_URL}/song`)
    .catch((error) => {
        if (error.response && error.response.status === 409) {
            return;
        }
    })
    console.log(response);
};

export default postSong;
