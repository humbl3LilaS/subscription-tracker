import type { ExpressController } from "../types/controller.types.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/env.ts";
import { User } from "../models/user.ts";

export const authorize: ExpressController = async (req, res, next) => {
    try {
        let token: string | null = null;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized Action.",
            });
            return;
        }

        const decoded = jwt.verify(token, config.env.jwt.secret) as JwtPayload;
        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized Action.",
            });
            return;
        }

        req.user = user;
        next();
    } catch {
        res.status(401).json({
            success: false,
            message: "Unauthorized Action.",
        });
    }
};
