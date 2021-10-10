import { AuthResponse, UserRegistration } from '../../types';
import keycloak from '../keycloak';
import login from './login';

const register = async (
    userRegistration: UserRegistration
): Promise<AuthResponse> => {
    const response = await keycloak.registerUser(userRegistration);
    if (response.status === 409) {
        return {
            ...response,
        };
    }
    // if the user was created, add data to the database related to users

    const tokens = await login(userRegistration);

    return { ...tokens, status: 200 };
};

export default register;
