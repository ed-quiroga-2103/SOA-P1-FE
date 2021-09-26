import env from 'react-dotenv';

const config = {
    KEYCLOAK_URL: env.KEYCLOAK_URL,
    KEYCLOAK_ADMIN: env.KEYCLOAK_ADMIN,
    KEYCLOAK_PASSWORD: env.KEYCLOAK_PASSWORD,
};

export default config;
