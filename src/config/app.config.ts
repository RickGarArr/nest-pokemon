import {
    API_PORT,
    DEFAULT_API_PORT,
    DEFAULT_NODE_ENV,
    MONGODB_AUTH_SOURCE,
    MONGODB_DB_NAME,
    MONGODB_HOST,
    MONGODB_PASSWORD,
    MONGODB_PORT,
    MONGODB_USERNAME
} from './env.constants';

export const envConfig = () => ({
    NODE_ENV: process.env.NODE_ENV || DEFAULT_NODE_ENV,
    API_PORT: process.env.PORT || DEFAULT_API_PORT,
    MONGODB_HOST: process.env[MONGODB_HOST],
    MONGODB_PORT: process.env[MONGODB_PORT],
    MONGODB_USERNAME: process.env[MONGODB_USERNAME],
    MONGODB_PASSWORD: process.env[MONGODB_PASSWORD],
    MONGODB_AUTH_SOURCE:  process.env[MONGODB_AUTH_SOURCE],
    MONGODB_DB_NAME:  process.env[MONGODB_DB_NAME],
});