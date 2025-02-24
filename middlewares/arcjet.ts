import type { ExpressController } from "../types/controller.types.ts";
import { aj } from "../config/arcjet.ts";

export const arcjetMiddleware: ExpressController = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 4 });

        if (decision.isDenied()) {
            switch (decision.reason.type) {
                case "RATE_LIMIT":
                    res.status(429).json({
                        error: "Rate Limit exceeded",
                    });
                    return;
                case "BOT":
                    res.status(403).json({
                        error: "Bot detected",
                    });
                    return;
                default:
                    res.status(403).json({
                        error: "Access denied",
                    });
                    return;
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};
