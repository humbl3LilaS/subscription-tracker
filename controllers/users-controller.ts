import type { ExpressController } from "../types/controller.types.ts";
import { User } from "../models/user.ts";
import { z } from "zod";

export const getAllUsers: ExpressController = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById: ExpressController = async (req, res, next) => {
    try {
        const params = req.params;

        // validate the searchParams
        const validatedParams = z
            .object({
                id: z.string(),
            })
            .safeParse(params);
        if (!validatedParams.success) {
            res.status(401).json({
                success: false,
                message: "Bad Request.",
            });
            return;
        }

        const { data } = validatedParams;

        const user = await User.findById(data.id).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User does not exist.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};
