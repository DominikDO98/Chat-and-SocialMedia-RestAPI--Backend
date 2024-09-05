export {};
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
			POSTGRES_DB: string;
			POSTGRES_TEST_DB: string;
			POSTGRES_HOST: string;
			ACCESS_TOKEN_SECRET: string;
		}
	}
}
