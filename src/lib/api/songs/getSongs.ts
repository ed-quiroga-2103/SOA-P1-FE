import axios from 'axios';
import { error } from 'console';
import { StringMappingType } from 'typescript';
import config from '../../../config';



const getSongs = async () => {
    const response = await axios
        .get(`${config.API_URL}/songs`)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });

    console.log(response);
    return response
};

export default getSongs;
