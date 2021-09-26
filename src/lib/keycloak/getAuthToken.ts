import axios from 'axios';
import config from '../../config';
import { AdminTokens } from '../../types';

const getAuthToken = async (): Promise<AdminTokens> => {
    const params = new URLSearchParams();

    params.append('client_id', 'admin-cli');
    params.append('grant_type', 'password');
    params.append('username', config.KEYCLOAK_ADMIN);
    params.append('password', config.KEYCLOAK_PASSWORD);

    const response = await axios.post(
        `${config.KEYCLOAK_URL}/auth/realms/master/protocol/openid-connect/token`,
        params
    );

    const adminTokens: AdminTokens = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
    };

    return adminTokens;
};
export default getAuthToken;
