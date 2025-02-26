import { Router } from "express";
import { authorize } from "../middlewares/authorization.ts";
import {
    cancelSubscription,
    createSubscription,
    deleteSubscription,
    getSubscriptionById,
    getSubscriptions,
    getUpcomingSubscription,
    updateSubscription,
} from "../controllers/subscriptions-controller.ts";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", authorize, getSubscriptions);

subscriptionsRouter.get("/upcoming-renewals", authorize, getUpcomingSubscription);

subscriptionsRouter.get("/:id", authorize, getSubscriptionById);

subscriptionsRouter.post("/", authorize, createSubscription);

subscriptionsRouter.put("/:id", authorize, updateSubscription);

subscriptionsRouter.delete("/:id", authorize, deleteSubscription);

subscriptionsRouter.put("/:id/cancel", authorize, cancelSubscription);

export { subscriptionsRouter };
