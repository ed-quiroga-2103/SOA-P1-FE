import axios from 'axios';
import config from '../../../config';
//var FormData = require('form-data');
import fs from 'fs';



const postSong = async (body: {
    name: string;
    artist: string;
    album: string;
    lyrics: string;
}, file : string) => {
    const data = new FormData()
    const response = await axios
        .post(`${config.API_URL}/songs`, body)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        }) as any;
    data.append('song',file);
    console.log("id from post", response.data._id)
    data.append('id',response.data._id);
    const configu = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    console.log(data)
    const upload = await axios
    .post(`${config.API_URL}/song`,data,configu)
    .catch((error) => {
        if (error.response && error.response.status === 409) {
            return;
        }
    })
    console.log(response);
};

export default postSong;
