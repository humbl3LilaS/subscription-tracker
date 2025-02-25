import type { ExpressController } from "../types/controller.types.ts";
import { Subscription } from "../models/subscription.ts";
import { createSubscriptionReqBody } from "../validation/subscriptions.ts";

export const createSubscription: ExpressController = async (req, res, next) => {
    try {
        const body = req.body;
        const validatedBody = createSubscriptionReqBody.safeParse(body);
        if (!validatedBody.success) {
            res.status(400).send({
                success: false,
                message: "Bad Request",
            });
            return;
        }
        const { data } = validatedBody;

        // validate if the user id is present
        if (!req.user || !req.user._id) {
            res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const userId = req.user._id;
        const subscription = await Subscription.create({
            ...data,
            user: userId,
        });

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
};

export const getUserSubscription: ExpressController = async (req, res, next) => {
    try {
        // validate if the user id is present
        if (!req.user || !req.user._id) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Request",
            });
            return;
        }
        const userId = req.user._id.toString();
        const id = req.params.userId;

        // check if the requested userId is the same as the userId in the jwt token
        if (id !== userId) {
            res.status(401).send({
                success: false,
                message: "Denied access to User Data",
            });
            return;
        }

        const subscriptions = await Subscription.find({ user: req.params.userId });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (e) {
        next(e);
    }
};
