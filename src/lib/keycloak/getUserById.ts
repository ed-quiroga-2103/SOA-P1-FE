import axios from 'axios';
import config from '../../config';
import { UserRegistration } from '../../types';
import auth from '../auth';
import getAuthToken from './getAuthToken';

const getUserById = async (token) => {
    const adminTokens = await getAuthToken();

    const headers = {
        Authorization: 'Bearer ' + adminTokens.accessToken,
    };

    const userId = auth.getUserId(token);
    const response = await axios
        .get(
            `${config.KEYCLOAK_URL}/auth/admin/realms/karaokeApp/users/${userId}`,
            {
                headers,
            }
        )
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                return;
            }
        });

    if (!response) {
        return { status: 409, message: 'Duplicate User' };
    }

    return response;
};

export default getUserById;
