import axios from 'axios';
import config from '../../../config';

const postUser = async (
    body: {
        name: string;
        lastname: string;
        email: string;
        premium: boolean;
    },
    id
) => {
    const response = await axios
        .put(`${config.API_URL}/users/${id}`, body)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });

    return response;
};

export default postUser;
