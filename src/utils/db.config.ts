import { PoolConfig } from 'pg';
import { config } from 'dotenv';
config ()

export const devConfig: PoolConfig = {
    database: process.env.DB,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 5432
};

export const testConfig: PoolConfig = {
    database: process.env.TEST_DB,
    host: process.env.TEST_HOST,
    user: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    port: 5432
};

export * as Config from './db.config';