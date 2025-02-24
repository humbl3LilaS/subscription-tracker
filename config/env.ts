import { config as dotenv } from "dotenv";

dotenv({ path: ".env" });

export const config = {
    env: {
        PORT: process.env.PORT!,
        DB_URL: process.env.DB_URL!,
        jwt: {
            secret: process.env.JWT_SECRET!,
            expiresIn: process.env.JWT_EXPIRES_IN!,
        },
        arcjet: {
            secret: process.env.ARCJET_KEY!,
            env: process.env.ARCJET_ENV!,
        },
    },
};
