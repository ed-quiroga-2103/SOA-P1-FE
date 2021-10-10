import axios from 'axios';
import config from '../../config';
import { UserUpdate } from '../../types';
import auth from '../auth';
import getAuthToken from './getAuthToken';

const updateUser = async (userRegistration: UserUpdate, premium, token) => {
    const body = {
        username: userRegistration.username,
        email: userRegistration.email,
        lastName: userRegistration.lastName,
        firstName: userRegistration.name,
        attributes: {
            premium,
        },
    };

    const userId = auth.getUserId(token);
    const adminTokens = await getAuthToken();

    const headers = {
        Authorization: 'Bearer ' + adminTokens.accessToken,
    };

    const response = await axios
        .put(
            `${config.KEYCLOAK_URL}/auth/admin/realms/karaokeApp/users/${userId}`,
            body,
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

    return { status: response.status };
};

export default updateUser;
