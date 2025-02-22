import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (_req, res) => {
    res.json({
        status: "Sign up Success",
    });
});

authRouter.post("/sign-in", (_req, res) => {
    res.json({
        status: "Sign in Success",
    });
});

authRouter.post("/sign-out", (_req, res) => {
    res.json({
        status: "Sign out Success",
    });
});

export { authRouter };
