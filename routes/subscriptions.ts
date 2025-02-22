import { Router } from "express";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", (_req, res) => {
    res.status(200).json({
        title: "Subscription List",
    });
});

subscriptionsRouter.get("/upcoming-renewals", (_req, res) => {
    res.status(200).json({
        title: "Upcoming Renewals",
    });
});

subscriptionsRouter.get("/:id", (req, res) => {
    res.status(200).json({
        title: "Subscription List",
        id: req.params.id,
    });
});

subscriptionsRouter.post("/", (_req, res) => {
    res.status(200).json({
        title: "Subscription Create",
    });
});

subscriptionsRouter.put("/:id", (req, res) => {
    res.status(200).json({
        title: "Update Subscription Details",
        id: req.params.id,
    });
});

subscriptionsRouter.delete("/:id", (req, res) => {
    res.status(200).json({
        title: "Delete Subscription",
        id: req.params.id,
    });
});
subscriptionsRouter.get("/users/:userId", (req, res) => {
    res.status(200).json({
        title: "Subscription List By User Id",
        userId: req.params.userId,
    });
});

subscriptionsRouter.put("/:id/cancel", (req, res) => {
    res.status(200).json({
        title: "Cancel Subscription.",
        id: req.params.id,
    });
});

export { subscriptionsRouter };
