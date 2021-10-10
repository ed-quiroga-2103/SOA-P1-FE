import axios from 'axios';
import config from '../../../config';

const putSong = async (body: {
    name: string;
    artist: string;
    album: string;
    lyrics: string;
    _id: string;
}) => {
    console.log(body._id);
    const response = await axios
        .put(`${config.API_URL}/songs/${body._id}`, body)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });
    console.log(response);
};

export default putSong;
