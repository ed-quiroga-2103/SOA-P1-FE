import axios from 'axios';
import config from '../../../config';

const getUser = async (id) => {
    const response = await axios
        .get(`${config.API_URL}/users/${id}`)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });

    return response;
};

export default getUser;
