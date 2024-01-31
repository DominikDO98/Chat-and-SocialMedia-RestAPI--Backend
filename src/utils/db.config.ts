import { PoolConfig } from 'pg';

export const devConfig: PoolConfig = {
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
};

export const testConfig: PoolConfig = {
    database: process.env.TEST_DB,
    user: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    port: process.env.TEST_PORT
};

export * as Config from './db.config';