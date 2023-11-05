declare namespace NodeJS {
    export interface ProcessEnv {
        SMTP_SENDER: string | undefined;
        SMTP_HOST: string | undefined;
        SMTP_USER: string | undefined;
        SMTP_PASS: string | undefined;
        SMTP_PORT: string;
        SMTP_SECURE: string | undefined;
    }
}