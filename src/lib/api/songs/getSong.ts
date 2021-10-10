import axios from 'axios';
import config from '../../../config';

const getSong = async (param: string, id: string) => {
    if (param == 'Song') {
        const response = await axios
            .get(`${config.API_URL}/songsN/${id}`)
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    return;
                }
            });
        console.log(response);
        return response;
    } else if (param == 'Artist') {
        console.log('Messaging api at /songsAr');
        const response = await axios
            .get(`${config.API_URL}/songsAr/${id}`)
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    return;
                }
            });
        console.log(response);
        return response;
    } else if (param == 'Album') {
        const response = await axios
            .get(`${config.API_URL}/songsAl/${id}`)
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    return;
                }
            });
        console.log(response);
        return response;
    } else if (param == 'Lyrics') {
        const response = await axios
            .get(`${config.API_URL}/songsL/${id}`)
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    return;
                }
            });
        console.log(response);
        return response;
    }
};

export default getSong;
