import { config as dotenv } from "dotenv";

dotenv({ path: ".env" });

export const config = {
    env: {
        PORT: process.env.PORT!,
        DB_URL: process.env.DB_URL!,
    },
};
