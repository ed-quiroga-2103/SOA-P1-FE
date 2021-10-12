import axios from 'axios';
import { error } from 'console';
import { StringMappingType } from 'typescript';
import config from '../../../config';



const getPage = async (page:number) => {
    const response = await axios
        .get(`${config.API_URL}/songs?page=${page}`)
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });

    console.log(response);
    return response
};

export default getPage;
