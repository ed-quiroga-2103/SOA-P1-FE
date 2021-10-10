import updateUser from '../keycloak/updateUser';
import changePassword from './changePassword';
import getUserId from './getUserId';
import isTokenExpired from './isTokenExpired';
import login from './login';
import register from './register';

export default {
    register,
    login,
    isTokenExpired,
    changePassword,
    getUserId,
};
