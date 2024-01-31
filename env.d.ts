export {}
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB: string,
            USER: string,
            PASSWORD: string,
            PORT: number,
            TEST_DB: string,
            TEST_USER: string,
            TEST_PASSWORD: string,
            TEST_PORT: number,
        }
    }
}