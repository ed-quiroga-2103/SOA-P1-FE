import axios from 'axios';
import config from '../../../config';

const deleteSong = async (id: string) => {
    const response = await axios
        .delete(`${config.API_URL}/songs/${id}`)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });
    console.log(response);
    
};

export default deleteSong;
