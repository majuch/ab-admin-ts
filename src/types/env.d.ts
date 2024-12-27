export {};

declare global {
    namespace JSX {
        interface ProcessEnv {
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: string;
            DB_DATABASE: string;
        }
    }
}