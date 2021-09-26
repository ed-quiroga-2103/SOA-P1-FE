import config from '../../config';
import { AuthResponse, UserRegistration } from '../../types';
import axios from 'axios';
import getAuthToken from './getAuthToken';

const registerUser = async (userRegistration: UserRegistration) => {
    const body = {
        username: userRegistration.username,
        credentials: [
            {
                type: 'password',
                value: userRegistration.password,
            },
        ],
        enabled: true,
        emailVerified: true,
    };

    const adminTokens = await getAuthToken();

    const headers = {
        Authorization: 'Bearer ' + adminTokens.accessToken,
    };

    const response = await axios
        .post(
            `${config.KEYCLOAK_URL}/auth/admin/realms/karaokeApp/users`,
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

export default registerUser;
