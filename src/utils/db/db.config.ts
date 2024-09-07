import { PoolConfig } from "pg";
import { config } from "dotenv";
config();

export const devConfig: PoolConfig = {
	database: process.env.POSTGRES_DB,
	host: process.env.DOCKER_POSTGRES_HOST || process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.DOCKER_APP_PORT ? Number(process.env.DOCKER_APP_PORT) : 5000,
};

export const testConfig: PoolConfig = {
	database: process.env.POSTGRES_TEST_DB,
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.DOCKER_APP_PORT ? Number(process.env.DOCKER_APP_PORT) : 5000,
};

export const initConfig: PoolConfig = {
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.DOCKER_APP_PORT ? Number(process.env.DOCKER_APP_PORT) : 5000,
};

export * as Config from "./db.config";
