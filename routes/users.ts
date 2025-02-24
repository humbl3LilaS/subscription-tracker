import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/users-controller.ts";
import { authorize } from "../middlewares/authorization.ts";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", authorize, getUserById);

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
