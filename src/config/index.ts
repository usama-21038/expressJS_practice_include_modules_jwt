import dotenv from 'dotenv';

dotenv.config();

const config = {
    // prefer an explicit connection string, fall back to common DATABASE_URL
    connectionString: (process.env.CONNECTIONSTRING || process.env.DATABASE_URL) as string | undefined,
    // application port (number) with a safe default
    port: process.env.PORT ? Number(process.env.PORT) : 3000,

    secret:process.env.JWT_SECRET
};

export default config;