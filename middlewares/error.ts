import type { ErrorMiddleWare } from "../types/error.types.ts";
import { Error as MongooseError } from "mongoose";

export const errorMiddleWare: ErrorMiddleWare = (err, _req, res, _next) => {
    if (err instanceof Error) {
        console.error(err.message);
    }

    // Handling If ObjectId not exit
    if (err instanceof MongooseError.CastError) {
        res.status(404).json({
            success: false,
            error: "Resource Not Found",
        });
    }

    // Handling Duplicated Key Error
    if (err instanceof MongooseError && "code" in err && err.code === 11000) {
        res.status(400).json({ success: false, error: "Duplicate Field value entered." });
    }

    // Handle Validation Error
    if (err instanceof MongooseError.ValidationError) {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        res.status(400).json({
            success: false,
            error: message,
        });
    }

    // General Error Handling
    if (err instanceof Error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};
