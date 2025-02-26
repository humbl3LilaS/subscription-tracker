import type { ExpressController } from "../types/controller.types.ts";
import { User } from "../models/user.ts";
import { z } from "zod";
import { updateUserRequestBody } from "../validation/user.ts";

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

export const updateUser: ExpressController = async (req, res, next) => {
    try {
        const validatedBody = updateUserRequestBody.partial().safeParse(req.body);
        if (!validatedBody.success) {
            res.status(401).send({
                success: false,
                message: "Bad Request.",
            });
            return;
        }

        const { data } = validatedBody;

        // validate if the user id is present
        if (!req.user || !req.user._id) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Request",
            });
            return;
        }
        const id = req.params.id;
        const userId = req.user._id.toString();

        if (id !== userId) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Mutation Of User Data",
            });
            return;
        }

        await User.findByIdAndUpdate(userId, data);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};
