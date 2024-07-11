export {};
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB: string;
			HOST: string;
			USER_DB: string;
			PASSWORD: string;
			TEST_DB: string;
			ACCESS_TOKEN_SECRET: string;
		}
	}
}
