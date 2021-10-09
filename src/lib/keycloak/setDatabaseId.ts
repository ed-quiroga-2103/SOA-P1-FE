import axios from 'axios';
import config from '../../config';
import getAuthToken from './getAuthToken';

const setDatabaseId = async (id, userId) => {
    const body = {
        attributes: { databaseId: id },
    };

    const adminTokens = await getAuthToken();

    const headers = {
        Authorization: 'Bearer ' + adminTokens.accessToken,
    };

    const response = await axios
        .put(
            `${config.KEYCLOAK_URL}/auth/admin/realms/karaokeApp/users/${userId}/`,
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
        return { status: 400, message: 'Error updating database id' };
    }

    return { status: response.status };
};

export default setDatabaseId;
