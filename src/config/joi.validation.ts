import * as Joi from 'joi';
import { DEFAULT_API_PORT } from './env.constants';

export const JoiValidationSchema = Joi.object({
    MONGODB_HOST: Joi.required(),
    MONGODB_PORT: Joi.optional().default(DEFAULT_API_PORT),
    MONGODB_USERNAME: Joi.string().required(),
    MONGODB_PASSWORD: Joi.string().required(),
    MONGODB_DB_NAME: Joi.string().required(),
    MONGODB_CONNECTION_NAME: Joi.string().required(),
    MONGODB_AUTH_SOURCE: Joi.string().required(),
});