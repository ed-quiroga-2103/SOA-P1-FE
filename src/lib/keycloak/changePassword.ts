import axios from 'axios';
import config from '../../config';
import getAuthToken from './getAuthToken';

const changePassword = async (newPassword, userId) => {
    const body = {
        type: 'password',
        value: newPassword,
        temporary: false,
    };

    const adminTokens = await getAuthToken();

    const headers = {
        Authorization: 'Bearer ' + adminTokens.accessToken,
    };

    const response = await axios
        .put(
            `${config.KEYCLOAK_URL}/auth/admin/realms/karaokeApp/users/${userId}/reset-password`,
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
        return { status: 400, message: 'Error updating password' };
    }

    return { status: response.status };
};

export default changePassword;
