import axios from 'axios';
import config from '../../config';
import { UserUpdate } from '../../types';
import getAuthToken from './getAuthToken';

const updateUser = async (userRegistration: UserUpdate) => {
    const body = {
        username: userRegistration.username,
        email: userRegistration.email,
        lastName: userRegistration.lastName,
        firstName: userRegistration.name,
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

export default updateUser;
