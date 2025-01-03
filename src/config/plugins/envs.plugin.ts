import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    PORT: env.get('PORT').required().asPortNumber(),
};