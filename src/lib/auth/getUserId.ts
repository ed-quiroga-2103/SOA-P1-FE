import decodeToken from './decodeToken';

const getUserId = (token) => {
    const decoded = decodeToken(token);

    return decoded.sub;
};

export default getUserId;
