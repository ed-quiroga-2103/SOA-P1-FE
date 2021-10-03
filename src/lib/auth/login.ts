import { AuthResponse, UserLogin } from '../../types';
import keycloak from '../keycloak';
import Cookies from 'universal-cookie';

const login = async (
    userLogin: UserLogin
): Promise<AuthResponse> => {
    const tokens = await keycloak.loginUser(userLogin);

    if (!tokens) {
        return { message: 'Wrong username or password', status: 401 };
    }

    const cookies = new Cookies();

    cookies.set('mochi', tokens, { path: '/' });

    return { ...tokens, status: 200 };
};

export default login;
