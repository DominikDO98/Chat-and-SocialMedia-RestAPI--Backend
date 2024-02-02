export {}
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB: string,
            HOST: string,
            USER: string,
            PASSWORD: string,
            TEST_DB: string,
            TEST_HOST: string,
            TEST_USER: string,
            TEST_PASSWORD: string,
        }
    }
}