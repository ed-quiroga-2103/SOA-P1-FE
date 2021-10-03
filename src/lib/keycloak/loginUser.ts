import axios from 'axios';
import config from '../../config';
import { UserLogin} from '../../types';
import getAuthToken from './getAuthToken';

const loginUser = async (loginData: UserLogin) => {
    const params = new URLSearchParams();

    params.append('client_id', 'admin-cli');
    params.append('grant_type', 'password');
    params.append('username', loginData.username);
    params.append('password', loginData.password);

    const adminTokens = await getAuthToken();

    const headers = {
        Authorization: 'Bearer ' + adminTokens.accessToken,
    };

    const response = await axios
        .post(
            `${config.KEYCLOAK_URL}/auth/realms/karaokeApp/protocol/openid-connect/token`,
            params,
            {
                headers,
            }
        )
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                return;
            } else throw error;
        });

    if (!response) {
        return;
    }

    const tokens = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
    };

    return tokens;
};

export default loginUser;
