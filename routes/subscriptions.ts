import { Router } from "express";
import { authorize } from "../middlewares/authorization.ts";
import {
    createSubscription,
    getSubscriptionById,
    getSubscriptions,
    updateSubscription,
} from "../controllers/subscriptions-controller.ts";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", authorize, getSubscriptions);

subscriptionsRouter.get("/upcoming-renewals", (_req, res) => {
    res.status(200).json({
        title: "Upcoming Renewals",
    });
});

subscriptionsRouter.get("/:id", authorize, getSubscriptionById);

subscriptionsRouter.post("/", authorize, createSubscription);

subscriptionsRouter.put("/:id", authorize, updateSubscription);

subscriptionsRouter.delete("/:id", (req, res) => {
    res.status(200).json({
        title: "Delete Subscription",
        id: req.params.id,
    });
});

subscriptionsRouter.put("/:id/cancel", (req, res) => {
    res.status(200).json({
        title: "Cancel Subscription.",
        id: req.params.id,
    });
});

export { subscriptionsRouter };
