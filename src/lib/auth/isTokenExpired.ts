import decodeToken from './decodeToken';

const isTokenExpired = async (token) => {
    console.log(token);
    if (!token) return true;

    const decoded = decodeToken(token);

    const now = new Date().getTime() / 1000;
    const tokenExp = decoded.exp;

    return now > tokenExp;
};

export default isTokenExpired;
