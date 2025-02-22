import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (_req, res) => {
    res.status(200).json({
        title: "User List",
    });
});

usersRouter.get("/:id", (req, res) => {
    res.status(200).json({
        title: "User Details",
        id: req.params.id,
    });
});

usersRouter.post("/", (_req, res) => {
    res.status(200).json({
        title: "User Create",
    });
});

usersRouter.put("/:id", (req, res) => {
    res.status(200).json({
        title: "Update User Details",
        id: req.params.id,
    });
});

usersRouter.delete("/:id", (req, res) => {
    res.status(200).json({
        title: "Delete User",
        id: req.params.id,
    });
});

export { usersRouter };
