import type { ExpressController } from "../types/controller.types.ts";
import { Subscription } from "../models/subscription.ts";
import {
    createSubscriptionReqBody,
    updateSubscriptionReqBody,
} from "../validation/subscriptions.ts";

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

export const getSubscriptions: ExpressController = async (req, res, next) => {
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

        const subscriptions = await Subscription.find({ user: userId });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (e) {
        next(e);
    }
};

export const getSubscriptionById: ExpressController = async (req, res, next) => {
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
        const subscriptionId = req.params.id;

        const subscription = await Subscription.findOne({ user: userId, _id: subscriptionId });

        if (!subscription) {
            res.status(404).send({
                success: false,
                message: "Subscription not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
};

export const getUpcomingSubscription: ExpressController = async (req, res, next) => {
    try {
        // validate if the user id is present
        if (!req.user || !req.user._id) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Request",
            });
            return;
        }
        const upComingSubscription = await Subscription.find({
            user: req.user._id,
            renewalDate: { $gte: new Date() },
            status: "active",
        });
        res.status(200).json({
            success: true,
            data: upComingSubscription,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription: ExpressController = async (req, res, next) => {
    try {
        const body = req.body;
        const validatedBody = updateSubscriptionReqBody.safeParse(body);

        if (!validatedBody.success) {
            res.status(401).send({
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
                message: "Unauthorized Request",
            });
            return;
        }
        const userId = req.user._id.toString();
        const subscriptionId = req.params.id;

        const subscription = await Subscription.findOneAndUpdate(
            { user: userId, _id: subscriptionId },
            { ...data },
        );

        if (!subscription) {
            res.status(404).send({
                success: false,
                message: "Subscription not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
};

export const cancelSubscription: ExpressController = async (req, res, next) => {
    try {
        // validate if the user id is present
        if (!req.user || !req.user._id) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Request",
            });
            return;
        }

        const subscriptionId = req.params.id;

        const updatedSubscription = await Subscription.findOneAndUpdate(
            {
                user: req.user._id,
                _id: subscriptionId,
            },
            { status: "cancelled" },
        );

        res.status(200).json({
            success: true,
            data: updatedSubscription,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription: ExpressController = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Request",
            });
            return;
        }
        const subscriptionId = req.params.id;

        const deletedSubscription = await Subscription.findOneAndDelete({
            user: req.user._id,
            _id: subscriptionId,
        });

        res.status(200).json({
            success: true,
            data: deletedSubscription,
        });
    } catch (error) {
        next(error);
    }
};
