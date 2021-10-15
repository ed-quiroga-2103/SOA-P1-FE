import axios from 'axios';
import config from '../../../config';

const uploadSong = async (body: {
    name: string;
    artist: string;
    album: string;
    lyrics: string;
}) => {
    const response = await axios
        .post(`${config.API_URL}/songs`, body)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });
    console.log(response);
};

export default uploadSong;
