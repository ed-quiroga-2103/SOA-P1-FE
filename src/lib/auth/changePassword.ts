import { Cookies } from 'react-cookie';
import keycloak from '../keycloak';
import decodeToken from './decodeToken';
import login from './login';

const changePassword = async (oldPassword, newPassword) => {
    const token = new Cookies().get('mochi');
    const decoded = decodeToken(token.accessToken);

    const username = decoded.preferred_username;

    const response = await login({ username, password: oldPassword });

    if (response.status !== 200) return false;

    await keycloak.changePassword(newPassword, decoded.sub);
    return true;
};

export default changePassword;
