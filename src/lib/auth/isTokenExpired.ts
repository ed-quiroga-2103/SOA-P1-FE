import decodeToken from './decodeToken';

const isTokenExpired = (token) => {
    if (!token) return true;

    const decoded = decodeToken(token);

    const now = new Date().getTime() / 1000;
    const tokenExp = decoded.exp;

    return now > tokenExp;
};

export default isTokenExpired;
