import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { config } from "./env.ts";

export const aj = arcjet({
    key: config.env.arcjet.secret, // Get your site key from https://app.arcjet.com
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 5, // Refill every 10 seconds
            capacity: 20, // Bucket capacity of 10 tokens
        }),
    ],
});
