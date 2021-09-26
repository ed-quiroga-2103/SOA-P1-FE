import { AuthResponse, UserRegistration } from '../../types';
import keycloak from '../keycloak';

const login = async (
    userRegistration: UserRegistration
): Promise<AuthResponse> => {
    const tokens = await keycloak.loginUser(userRegistration);

    if (!tokens) {
        return { message: 'Wrong username or password', status: 401 };
    }

    return { ...tokens, status: 200 };
};

export default login;
