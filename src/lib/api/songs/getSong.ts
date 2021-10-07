import axios from 'axios';
import config from '../../../config';

const getSong = async (id: string) => {
    const response = await axios
        .get(`${config.API_URL}/songs/${id}`)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });
    console.log(response);
    
};

export default getSong;
